import type { NormalizedData, WeatherAPIResponse } from '@nativeweather/types';
import { BASE_URL } from './fetchLocation';
import { mapWeatherApi } from './mapWeatherAPI';

/**
 * Why no weather came back. `notfound`: the API knows no such place (404). `offline`: no answer at all. `error`: any
 * other failed or unreadable answer, such as an outage of the weather provider (502).
 */
export type WeatherError = 'notfound' | 'offline' | 'error';

export type WeatherResult = { weather: NormalizedData; error?: never } | { weather: null; error?: WeatherError };

/** Like `fetchWeather`, but says why it failed. An aborted request has no error. */
export const fetchWeatherResult = async (
	query: string | number[],
	options?: { signal?: AbortSignal }
): Promise<WeatherResult> => {
	let response: Response;
	try {
		response = await fetch(`${BASE_URL}/forecast.json?q=${encodeURIComponent(query.toString())}`, {
			signal: options?.signal,
		});
	} catch (error) {
		if (options?.signal?.aborted) return { weather: null };
		console.error('Failed to fetch weather data:', error);
		return { weather: null, error: 'offline' };
	}

	if (!response.ok) return { weather: null, error: response.status === 404 ? 'notfound' : 'error' };

	try {
		return { weather: mapWeatherApi((await response.json()) as WeatherAPIResponse) };
	} catch (error) {
		if (options?.signal?.aborted) return { weather: null };
		console.error('Failed to read weather data:', error);
		return { weather: null, error: 'error' };
	}
};

export const fetchWeather = async (
	query: string | number[],
	options?: { signal?: AbortSignal }
): Promise<NormalizedData | null> => (await fetchWeatherResult(query, options)).weather;
