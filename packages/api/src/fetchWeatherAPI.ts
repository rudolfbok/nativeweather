import type { City } from '@nativeweather/types/city';
import type { WeatherAPIResponse } from '@nativeweather/types/weatherAPI';

const BASE_URL = 'https://nativeweather-api.bitwebs.workers.dev';

export const fetchWeatherAPIOrThrow = async (
	query: string | number[],
	options?: { signal?: AbortSignal; cache?: RequestCache }
): Promise<WeatherAPIResponse> => {
	const weatherUrl = `${BASE_URL}/forecast.json?q=${encodeURIComponent(query.toString())}`;
	const response = await fetch(weatherUrl, {
		signal: options?.signal,
		cache: options?.cache,
	});

	if (!response.ok) {
		const errorBody = await response.text();
		const upstreamStatus = Number(errorBody.match(/\b[45]\d{2}\b/)?.[0]);
		const status = upstreamStatus || response.status;

		const error = new Error(`Weather request failed (${status})`);
		Object.assign(error, { status });
		throw error;
	}

	return (await response.json()) as WeatherAPIResponse;
};

export const fetchWeatherAPI = async (
	query: string | number[],
	options?: { signal?: AbortSignal }
): Promise<WeatherAPIResponse | null> => {
	try {
		return await fetchWeatherAPIOrThrow(query, options);
	} catch (error) {
		if (options?.signal?.aborted) return null;
		console.error('Failed to fetch weather data:', error);
		return null;
	}
};

export const fetchLocation = async (
	searchedLocation: string | number[],
	options?: { signal?: AbortSignal }
): Promise<City[] | null> => {
	const locationUrl = `${BASE_URL}/search.json?q=${encodeURIComponent(searchedLocation.toString())}`;

	try {
		const response = await fetch(locationUrl, { signal: options?.signal });

		if (!response.ok) {
			throw new Error(`Location request failed (${response.status})`);
		}

		const locationData = (await response.json()) as City[];

		if (!locationData) {
			throw new Error("Can't fetch suggestions");
		}

		return locationData;
	} catch (error) {
		if (options?.signal?.aborted) return null;
		console.error('Failed to fetch suggestions data:', error);
		return null;
	}
};
