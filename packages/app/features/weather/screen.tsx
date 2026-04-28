import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { StyledText } from 'app/components/common/styled/StyledText';
import { HeroWeather } from 'app/components/weather/HeroWeather';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorageString';
import { WeatherLandscape } from 'app/utils/mappings/mapLandscapes';
import * as Burnt from 'burnt';
import { clsx } from 'clsx';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, RefreshControl, View } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const REFRESH_PULL_DISTANCE = 84;

export const WeatherFeature = () => {
	const { t } = useTranslate('common');
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const pullDistance = useSharedValue(0);
	const refreshProgress = useSharedValue(0);
	const navigation = useNavigation();
	const scrollY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			pullDistance.value = Math.max(-event.contentOffset.y + event.contentInset.top, 0);
		},
	});

	const headerTint = useSwitchColors('white', 'white');

	useEffect(() => {
		refreshProgress.value = withTiming(refreshing ? 1 : 0, { duration: 180 });
	}, [refreshing, refreshProgress]);

	const pullIndicatorStyle = useAnimatedStyle(() => {
		const pullProgress = Math.min(pullDistance.value / REFRESH_PULL_DISTANCE, 1);
		const progress = Math.max(refreshProgress.value, pullProgress);
		const translateY = interpolate(progress, [0, 1], [18, 0]);
		const scale = interpolate(progress, [0, 1], [0.88, 1]);

		return {
			opacity: progress,
			transform: [{ translateY }, { scale }] as const,
		};
	});

	useEffect(() => {
		const id = scrollY.value; // dummy read to avoid linter warning
		if (weatherData && Appearance.getColorScheme() === 'light') {
			const interval = setInterval(() => {
				if (scrollY.value < 10) {
					navigation.setOptions({
						headerTintColor: headerTint,
					});
				} else {
					navigation.setOptions({
						headerTintColor: 'black',
						headerBackground: () => undefined,
					});
				}
			}, 16);
			return () => clearInterval(interval);
		}
	}, [scrollY]);

	useEffect(() => {
		if (weatherData && scrollY.value < 10) {
			navigation.setOptions({
				headerTitle: weatherData.location.name,
				headerTintColor: headerTint,
			});
		} else {
			navigation.setOptions({
				headerTitle: t('tab.weather'),
			});
		}
	}, [weatherData]);

	const onRefresh = async () => {
		if (!weatherData) return;

		setRefreshing(true);

		try {
			const rereshedData = await fetchWeather(
				`${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`,
				currentSource
			);

			if (!rereshedData) throw new Error('No fresh weather data');

			setWeatherData(rereshedData);

			Burnt.toast({
				preset: 'done',
				title: t('toast.refreshed'),
				from: 'bottom',
			});
		} catch (error) {
			Burnt.toast({
				preset: 'error',
				title: t('toast.notrefreshed'),
				from: 'bottom',
			});
		} finally {
			setRefreshing(false);
		}
	};

	if (!weatherData) {
		return (
			<View className={clsx('flex-1 items-center justify-center')}>
				<WeatherIcon isDay={1} width={150} height={150} code={1003} strokeWidth={0.5} source={currentSource} />
				<StyledText type="subtitle">Current weather data will be displayed here.</StyledText>
				<StyledText type="subtitle">Search or click from favorites.</StyledText>
			</View>
		);
	}

	return (
		<View className={clsx('flex-1')}>
			<Animated.View
				pointerEvents="none"
				className={clsx('absolute left-0 right-0 z-20 h-9 items-center justify-center')}
				style={[{ top: insets.top + 50 }, pullIndicatorStyle]}
			>
				<ActivityIndicator animating={true} size="small" color="gray" />
			</Animated.View>
			<Animated.ScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				contentInsetAdjustmentBehavior="automatic"
				refreshControl={
					<RefreshControl
						tintColor="transparent"
						colors={['transparent']}
						progressBackgroundColor="transparent"
						refreshing={refreshing}
						onRefresh={onRefresh}
						progressViewOffset={insets.top}
					/>
				}
			>
				<View className={clsx('absolute -top-[540px] left-0 right-0 -z-10 h-[1000px]')}>
					<WeatherLandscape code={weatherData.current.condition.code} isDay={weatherData.current.isDay} />
				</View>
				<HeroWeather />
			</Animated.ScrollView>
		</View>
	);
};
