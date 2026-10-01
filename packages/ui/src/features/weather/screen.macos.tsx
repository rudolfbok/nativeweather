import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { HeroWeather } from '@nativeweather/ui/components/weather/hero/HeroWeather';
import { WeatherIcon } from '@nativeweather/ui/components/icons/weather/WeatherIcon';
import { fetchWeather } from '@nativeweather/api/fetchWeather';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { useLocation } from '@nativeweather/ui/hooks/location/useLocation.macos';
import { useLocalWeather } from '@nativeweather/ui/hooks/weather/useLocalWeather';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { View } from 'react-native';

export const WeatherFeature = () => {
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const { getLocalWeather } = useLocation();
	const localWeatherData = useLocalWeather((state) => state.localWeatherData);

	useEffect(() => {
		if (!weatherData && localWeatherData) void setWeatherData(localWeatherData);
	}, [localWeatherData, setWeatherData, weatherData]);

	useEffect(() => {
		if (weatherData || !currentSource) return;

		const loadInitialWeather = async () => {
			const localWeather = localWeatherData ?? (await getLocalWeather());
			const initialWeather = localWeather ?? (await fetchWeather('New York', currentSource));

			if (initialWeather && !useWeather.getState().weatherData) {
				await setWeatherData(initialWeather);
			}
		};

		loadInitialWeather();
	}, [currentSource, getLocalWeather, localWeatherData, setWeatherData, weatherData]);

	if (!weatherData) {
		return (
			<View className={clsx('flex-1 items-center justify-center')}>
				<WeatherIcon isDay={1} width={150} height={150} code={1003} strokeWidth={0.5} source={currentSource} />
				<StyledText type="sectiontitle">No weather location selected.</StyledText>
				<StyledText type="sectiontitle">Search for a city or choose a favorite.</StyledText>
			</View>
		);
	}

	return (
		<View className={clsx('flex-1')}>
			<HeroWeather />
		</View>
	);
};
