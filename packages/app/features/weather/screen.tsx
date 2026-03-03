import { LinearGradient } from 'expo-linear-gradient';
import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { StyledText } from 'app/components/common/styled/StyledText';
import { HeroSkeleton } from 'app/components/common/ui/HeroSkeleton';
import { HeroWeather } from 'app/components/weather/HeroWeather';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorageString';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { WeatherLandscape } from 'app/utils/mappings/mapLandscapes';
import * as Burnt from 'burnt';
import { clsx } from 'clsx';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, RefreshControl, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const WeatherFeature = () => {
	const { t } = useTranslate('common');
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const scrollY = useSharedValue(80);
	const navigation = useNavigation();

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	const headerTint = useSwitchColors('white', 'white');
	const headerTintafterScroll = useSwitchColors('black', 'white');

	useEffect(() => {
		if (weatherData) {
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
				<WeatherIcon
					isDay={1}
					width={150}
					height={150}
					code={1003}
					strokeWidth={StyleSheet.hairlineWidth}
					source={currentSource}
				/>
				<StyledText type="subtitle">Current weather data will be displayed here.</StyledText>
				<StyledText type="subtitle">Search or click from favorites.</StyledText>
			</View>
		);
	}

	return (
		<LinearGradient
			colors={['#3397BE', '#7ED0DD', '#83D6DF']} // gradient colors
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{ flex: 1 }}
		>
			<Animated.ScrollView
				onScroll={scrollHandler}
				contentInsetAdjustmentBehavior="automatic"
				refreshControl={
					<RefreshControl
						tintColor="blue"
						refreshing={refreshing}
						onRefresh={onRefresh}
						progressViewOffset={insets.top + 100}
					/>
				}
			>
				<HeroWeather />
				{/* Optional: add WeatherLandscape absolutely behind if needed */}
				{/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1000, zIndex: -1 }}>
          <WeatherLandscape code={weatherData.current.condition.code} isDay={weatherData.current.isDay} />
        </View> */}
			</Animated.ScrollView>
		</LinearGradient>
	);
};
