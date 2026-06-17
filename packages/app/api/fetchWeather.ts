import { fetchWeatherAPI } from './fetchWeatherAPI';
import { mapWeatherApi } from './mapWeatherAPI';

export const fetchWeather = async (query: any, source: string) => {
	try {
		if (source === 'weatherapi') {
			const weatherData = await fetchWeatherAPI(query);
			const normalizedData = mapWeatherApi(weatherData);
			return normalizedData;
		}

		return null;
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return null;
	}
};
