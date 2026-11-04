import type { NormalizedData, WeatherAPIResponse } from '@nativeweather/types';
import { BASE_URL } from './fetchLocation';
import { mapWeatherApi } from './mapWeatherAPI';

export const fetchWeather = async (
	query: string | number[],
	options?: { signal?: AbortSignal }
): Promise<NormalizedData | null> => {
	try {
		const weatherUrl = `${BASE_URL}/forecast.json?q=${encodeURIComponent(query.toString())}`;
		const response = await fetch(weatherUrl, { signal: options?.signal });

		if (!response.ok) {
			throw new Error(`Weather request failed (${response.status})`);
		}

		const weatherResponse = (await response.json()) as WeatherAPIResponse;
		return mapWeatherApi(weatherResponse);
	} catch (error) {
		if (options?.signal?.aborted || (error instanceof Error && error.name === 'AbortError')) return null;
		console.error('Failed to fetch weather data:', error);
		return null;
	}
};
