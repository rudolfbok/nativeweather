import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { StyledText } from 'app/components/common/StyledText';
import { HeroWeather } from 'app/components/weather/HeroWeather';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { useWeather } from 'app/hooks/useWeather';
import { WeatherIcon } from 'app/utils/mappings/mapIcons';
import { WeatherLandscape } from 'app/utils/mappings/mapLandscapes';
import * as Burnt from 'burnt';
import { clsx } from 'clsx';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const WeatherFeature = () => {
	const { t } = useTranslate('common');
	const { weatherData, setWeatherData } = useWeather();
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const scrollY = useSharedValue(0);
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

	useEffect(() => {
		const id = scrollY.value; // dummy read to avoid linter warning
		if (weatherData) {
			const interval = setInterval(() => {
				if (scrollY.value < 20) {
					navigation.setOptions({
						headerTintColor: headerTint,
					});
				} else {
					navigation.setOptions({
						headerTintColor: headerTintafterScroll,
						headerBackground: () => undefined,
					});
				}
			}, 16);
			return () => clearInterval(interval);
		}
	}, [headerTintafterScroll, scrollY]);

	const onRefresh = async () => {
		if (!weatherData) return;

		setRefreshing(true);
		console.log('Refresh started');

		try {
			const rereshedData = await fetchWeather(
				`${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`
			);

			if (!rereshedData) {
				throw new Error('No fresh weather data');
			}

			setWeatherData(rereshedData);

			Burnt.toast({
				preset: 'done',
				title: t('toast.refreshed'),
				from: 'bottom',
			});
		} catch (error) {
			console.error('Error fetching weather:', error);

			Burnt.toast({
				preset: 'error',
				title: t('toast.notrefreshed'),
				from: 'bottom',
			});
		} finally {
			setRefreshing(false);
			console.log('Refresh ended');
		}
	};

	if (!weatherData)
		return (
			<View className={clsx('items-center justify-center')}>
				<WeatherIcon isDay={1} width={150} height={150} code={1003} strokeWidth={StyleSheet.hairlineWidth} />
				<StyledText type="subtitle">Current weather data will be displayed here.</StyledText>
				<StyledText type="subtitle">Search or click from favorites.</StyledText>
			</View>
		);

	return (
		<Animated.ScrollView
			onScroll={scrollHandler}
			contentInsetAdjustmentBehavior="automatic"
			refreshControl={
				<View style={{ zIndex: 100 }}>
					<RefreshControl
						tintColor="blue"
						refreshing={refreshing}
						onRefresh={onRefresh}
						progressViewOffset={insets.top + 100}
					/>
				</View>
			}
		>
			<View
				className={clsx('w-full')}
				style={{
					height: 1000,
					top: -540,
					left: 0,
					right: 0,
					position: 'absolute',
					zIndex: -1,
				}}
			>
				<WeatherLandscape code={weatherData.current.condition.code} isDay={weatherData.current.is_day} />
			</View>
			<HeroWeather />
		</Animated.ScrollView>
	);
};
