import type { NormalizedData } from 'app/types/normalizedData';
import { fetchWeatherAPIOrThrow, WeatherRequestError } from './fetchWeatherAPI';
import { mapWeatherApi } from './mapWeatherAPI';

export class WeatherFetchError extends Error {
	constructor(
		message: string,
		readonly cause?: unknown
	) {
		super(message, { cause });
		this.name = 'WeatherFetchError';
	}
}

export const fetchWeatherOrThrow = async (
	query: string | number[],
	source: string,
	options?: { signal?: AbortSignal }
): Promise<NormalizedData> => {
	try {
		if (source !== 'weatherapi') throw new WeatherFetchError('This weather source is not configured.');
		return mapWeatherApi(await fetchWeatherAPIOrThrow(query, options));
	} catch (error) {
		if (error instanceof WeatherRequestError || error instanceof WeatherFetchError) throw error;
		throw new WeatherFetchError('The weather response was invalid.', error);
	}
};

export const fetchWeather = async (
	query: string | number[],
	source: string,
	options?: { signal?: AbortSignal }
): Promise<NormalizedData | null> => {
	try {
		return await fetchWeatherOrThrow(query, source, options);
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return null;
	}
};
