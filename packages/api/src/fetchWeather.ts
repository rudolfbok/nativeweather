import type { NormalizedData } from '@nativeweather/types/normalizedData';
import { fetchWeatherAPIOrThrow } from './fetchWeatherAPI';
import { mapWeatherApi } from './mapWeatherAPI';

export const fetchWeatherOrThrow = async (
	query: string | number[],
	source: string,
	options?: { signal?: AbortSignal }
): Promise<NormalizedData> => {
	if (source !== 'weatherapi') throw new Error('This weather source is not configured.');
	return mapWeatherApi(await fetchWeatherAPIOrThrow(query, options));
};

export const fetchWeather = async (
	query: string | number[],
	source: string,
	options?: { signal?: AbortSignal }
): Promise<NormalizedData | null> => {
	try {
		return await fetchWeatherOrThrow(query, source, options);
	} catch (error) {
		if (options?.signal?.aborted || (error instanceof Error && error.name === 'AbortError')) return null;
		console.error('Failed to fetch weather data:', error);
		return null;
	}
};
