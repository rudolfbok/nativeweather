import { WeatherData } from 'app/types/weatherData';
import { Share } from 'react-native';
import { buildWeatherSlug } from './buildWeatherSlug';

export const shareLink = async (weatherData: WeatherData) => {
	const url = `https://nativeweather.app/${buildWeatherSlug(weatherData)}`;

	try {
		await Share.share({
			url, // místo message
			title: `Weather in ${weatherData.location.name}`,
		});
	} catch (error) {
		console.error('Error sharing:', error);
	}
};
