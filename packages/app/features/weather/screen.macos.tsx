import { StyledText } from 'app/components/common/styled/StyledText';
import { HeroWeather } from 'app/components/weather/hero/HeroWeather';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useLocalWeather } from 'app/hooks/weather/useLocalWeather';
import { useStorageString } from 'app/database/useStorage';
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

	if (!weatherData) {
		return (
			<View className={clsx('flex-1 items-center justify-center')}>
				<WeatherIcon isDay={1} width={150} height={150} code={1003} strokeWidth={0.5} source={currentSource} />
				<StyledText type="subtitle">No weather location selected.</StyledText>
				<StyledText type="subtitle">Search for a city or choose a favorite.</StyledText>
			</View>
		);
	}

	return (
		<View className={clsx('flex-1')}>
			<HeroWeather />
		</View>
	);
};
