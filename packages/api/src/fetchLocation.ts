import type { City } from '@nativeweather/types';

export const BASE_URL = 'https://nativeweather-api.bitwebs.workers.dev';

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
