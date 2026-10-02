import { HeroWeather } from '@nativeweather/ui/components/weather/hero/HeroWeather';
import { HeroSkeleton } from '@nativeweather/ui/components/common/loading/HeroSkeleton.macos';
import { fetchWeather } from '@nativeweather/api/fetchWeather';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { useLocalWeather } from '@nativeweather/ui/hooks/weather/useLocalWeather';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { View } from 'react-native';

export const WeatherFeature = () => {
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const localWeatherData = useLocalWeather((state) => state.localWeatherData);

	useEffect(() => {
		if (!weatherData && localWeatherData) void setWeatherData(localWeatherData);
	}, [localWeatherData, setWeatherData, weatherData]);

	useEffect(() => {
		if (weatherData || !currentSource) return;

		const loadInitialWeather = async () => {
			const initialWeather = await fetchWeather('New York', currentSource);

			if (initialWeather && !useWeather.getState().weatherData) {
				await setWeatherData(initialWeather);
			}
		};

		void loadInitialWeather();
	}, [currentSource, setWeatherData, weatherData]);

	if (!weatherData) {
		return <HeroSkeleton />;
	}

	return (
		<View className={clsx('flex-1')}>
			<HeroWeather />
		</View>
	);
};
