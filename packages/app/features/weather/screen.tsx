import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { StyledText } from 'app/components/common/styled/StyledText';
import { HeroWeather } from 'app/components/weather/HeroWeather';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useTextColor } from 'app/hooks/useThemeColors';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorage';
import { WeatherLandscape } from 'app/utils/mappings/mapLandscapes';
import * as Burnt from 'burnt';
import { clsx } from 'clsx';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const WeatherFeature = () => {
	const { t } = useTranslate('common');
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const textColor = useTextColor();
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const refreshProgress = useSharedValue(0);
	const navigation = useNavigation();

	useEffect(() => {
		refreshProgress.value = withTiming(refreshing ? 1 : 0, { duration: 180 });
	}, [refreshing, refreshProgress]);

	const pullIndicatorStyle = useAnimatedStyle(() => {
		const progress = Math.max(refreshProgress.value);
		return {
			opacity: progress,
		};
	});

	useEffect(() => {
		if (weatherData) {
			navigation.setOptions({
				headerTitle: weatherData.location.name,
				headerTintColor: textColor,
				headerTitleStyle: { color: textColor },
			});
		} else {
			navigation.setOptions({
				headerTitle: t('tab.weather'),
				headerTintColor: textColor,
				headerTitleStyle: { color: textColor },
			});
		}
	}, [navigation, t, textColor, weatherData]);

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
				style={[{ top: insets.top + 60 }, pullIndicatorStyle]}
			>
				<ActivityIndicator animating={true} size="large" color="#FFFFFF83" />
			</Animated.View>
			<Animated.ScrollView
				// onScroll={scrollHandler}
				// scrollEventThrottle={16}
				contentInsetAdjustmentBehavior="automatic"
				refreshControl={
					<RefreshControl
						tintColor="white"
						colors={['white']}
						progressBackgroundColor="transparent"
						refreshing={refreshing}
						onRefresh={onRefresh}
						// progressViewOffset={150}
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
