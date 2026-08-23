import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { StyledText } from 'app/components/common/styled/StyledText';
import { HeroWeather } from 'app/components/weather/hero/HeroWeather';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useStorageString } from 'app/database/useStorage';
import * as Burnt from 'burnt';
import { clsx } from 'clsx';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

export const WeatherFeature = () => {
	const { t } = useTranslate('common');
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const { text } = useThemeColors();
	const [refreshing, setRefreshing] = useState(false);
	const [landscapeHeight, setLandscapeHeight] = useState(0);
	const [shouldChangeColor, setShouldChangeColor] = useState(false);
	const refreshProgress = useSharedValue(0);
	const navigation = useNavigation();

	useEffect(() => {
		refreshProgress.value = withTiming(refreshing ? 1 : 0, { duration: 180 });
	}, [refreshing, refreshProgress]);

	useEffect(() => {
		if (weatherData) {
			navigation.setOptions({
				headerTitle: weatherData.location.name,
				headerTintColor: shouldChangeColor ? text : 'white',
				headerTitleStyle: { color: shouldChangeColor ? text : 'white' },
			});
		} else {
			navigation.setOptions({
				headerTitle: t('tab.weather'),
				headerTintColor: text,
				headerTitleStyle: { color: text },
			});
		}
	}, [navigation, shouldChangeColor, t, text, weatherData]);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const changeColor =
			landscapeHeight - 50 > 0 && event.nativeEvent.contentOffset.y >= landscapeHeight - 50;
		setShouldChangeColor((current) => (current === changeColor ? current : changeColor));
	};

	const onRefresh = async () => {
		if (!weatherData) return;

		setRefreshing(true);

		try {
			const refreshedData = await fetchWeather(
				`${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`,
				currentSource
			);

			if (!refreshedData) throw new Error('No fresh weather data');

			setWeatherData(refreshedData);

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
			{/* <Animated.View
				pointerEvents="none"
				className={clsx('absolute left-0 right-0 z-20 h-9 items-center justify-center')}
				style={[{ top: insets.top + 60 }, pullIndicatorStyle]}
			>
				<ActivityIndicator animating={true} size="large" color="#FFFFFF83" />
			</Animated.View> */}
			<Animated.ScrollView
				onScroll={handleScroll}
				scrollEventThrottle={16}
				contentInsetAdjustmentBehavior="automatic"
				refreshControl={
					<RefreshControl
						tintColor="white"
						colors={['white']}
						progressBackgroundColor="transparent"
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				<HeroWeather onLandscapeLayout={setLandscapeHeight} />
			</Animated.ScrollView>
		</View>
	);
};
