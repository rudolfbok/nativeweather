import { HeroWeather } from '../../components/weather/hero/HeroWeather';
import { HeroSkeleton } from '../../components/common/loading/HeroSkeleton.macos';
import { fetchWeather } from '@nativeweather/api/fetchWeather';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { useLocalWeather } from '@nativeweather/core/hooks/weather/useLocalWeather';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { View } from 'react-native';

export const WeatherFeature = () => {
	const { weatherData, setWeatherData } = useWeather();
	const localWeatherData = useLocalWeather((state) => state.localWeatherData);

	useEffect(() => {
		if (!weatherData && localWeatherData) void setWeatherData(localWeatherData);
	}, [localWeatherData, setWeatherData, weatherData]);

	useEffect(() => {
		if (weatherData) return;

		const loadInitialWeather = async () => {
			const initialWeather = await fetchWeather('New York');

			if (initialWeather && !useWeather.getState().weatherData) {
				await setWeatherData(initialWeather);
			}
		};

		void loadInitialWeather();
	}, [setWeatherData, weatherData]);

	if (!weatherData) {
		return <HeroSkeleton />;
	}

	return (
		<View className={clsx('flex-1')}>
			<HeroWeather />
		</View>
	);
};
