import { StyledText } from 'app/components/common/styled/StyledText';
import { HeroWeather } from 'app/components/weather/HeroWeather';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorage';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const WeatherFeature = () => {
	const [currentSource] = useStorageString('currentSource');
	const { weatherData } = useWeather();

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
			<HeroWeather />
		</View>
	);
};
