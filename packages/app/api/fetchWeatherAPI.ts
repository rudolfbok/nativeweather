import type { City } from 'app/types/city';
import type { WeatherAPIResponse } from 'app/types/weatherAPI';

const BASE_URL = 'https://nativeweather-api.bitwebs.workers.dev';

export const fetchWeatherAPI = async (
	query: string | number[],
	options?: { signal?: AbortSignal }
): Promise<WeatherAPIResponse | null> => {
	const weatherUrl = `${BASE_URL}/forecast.json?q=${encodeURIComponent(query.toString())}`;

	try {
		const response = await fetch(weatherUrl, { signal: options?.signal });

		if (!response.ok) {
			throw new Error(`Weather request failed (${response.status})`);
		}

		const weatherData = (await response.json()) as WeatherAPIResponse;

		if (!weatherData) {
			throw new Error('City not found');
		}

		return weatherData;
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
