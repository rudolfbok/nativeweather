import { fetchOpenWeatherAPI } from './fetchOpenWeatherAPI';
import { fetchWeatherAPI } from './fetchWeatherAPI';
import { mapOpenWeatherApi } from './mapOpenWeatherAPI';
import { mapWeatherApi } from './mapWeatherAPI';

export const fetchWeather = async (query: any, source: string) => {
	try {
		if (source === 'weatherapi') {
			const weatherData = await fetchWeatherAPI(query);
			if (!weatherData || weatherData.error || Array.isArray(weatherData)) {
				return null;
			}
			const normalizedData = mapWeatherApi(weatherData);
			return normalizedData;
		}

		if (source === 'openweather') {
			const weatherData = await fetchOpenWeatherAPI(query);
			if (!weatherData || weatherData.error || Array.isArray(weatherData)) {
				return null;
			}

			const normalizedData = mapOpenWeatherApi(weatherData);
			return normalizedData;
		}
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return null;
	}

	return null;
};
