import { StyledText } from 'app/components/common/styled/StyledText';
import { HeroWeather } from 'app/components/weather/hero/HeroWeather';
import { WeatherIcon } from 'app/components/icons/weather/WeatherIcon';
import { fetchWeather } from 'app/api/fetchWeather';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useLocation } from 'app/hooks/location/useLocation.macos';
import { useLocalWeather } from 'app/hooks/weather/useLocalWeather';
import { useStorageString } from 'app/database/useStorage';
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
