import type { NormalizedData } from 'app/types/normalizedData';
import { fetchWeatherAPI } from './fetchWeatherAPI';
import { mapWeatherApi } from './mapWeatherAPI';

export const fetchWeather = async (
	query: string | number[],
	source: string,
	options?: { signal?: AbortSignal }
): Promise<NormalizedData | null> => {
	try {
		if (source === 'weatherapi') {
			const weatherData = await fetchWeatherAPI(query, options);
			if (!weatherData) return null;

			return mapWeatherApi(weatherData);
		}

		// Future sources fetch and map their response here.
		return null;
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return null;
	}
};
