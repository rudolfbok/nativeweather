import { fetchOpenWeatherAPI } from './fetchOpenWeatherAPI';
import { fetchWeatherAPI } from './fetchWeatherAPI';
import { mapOpenWeatherApi } from './mapOpenWeatherAPI';
import { mapWeatherApi } from './mapWeatherAPI';

export const fetchWeather = async (query: any, source: string) => {
	if (source === 'weatherapi') {
		const weatherData = await fetchWeatherAPI(query);
		if (!weatherData) {
			throw new Error('City not found');
		}
		const normalizedData = mapWeatherApi(weatherData);
		return normalizedData;
	}

	if (source === 'openweather') {
		const weatherData = await fetchOpenWeatherAPI(query);
		if (!weatherData) {
			throw new Error('City not found');
		}

		const normalizedData = mapOpenWeatherApi(weatherData);
		return normalizedData;
	}

	throw new Error('Unknown weather source');
};
