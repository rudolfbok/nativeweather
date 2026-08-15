import type { City } from 'app/types/city';
import type { WeatherAPIResponse } from 'app/types/weatherAPI';

const BASE_URL = 'https://nativeweather-api.bitwebs.workers.dev';

export const fetchWeatherAPI = async (query: string | number[]): Promise<WeatherAPIResponse | null> => {
	const weatherUrl = `${BASE_URL}/forecast.json?q=${query}`;

	try {
		const response = await fetch(weatherUrl);

		if (!response.ok) {
			throw new Error(`Weather request failed (${response.status})`);
		}

		const weatherData = (await response.json()) as WeatherAPIResponse;

		if (!weatherData) {
			throw new Error('City not found');
		}

		return weatherData;
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return null;
	}
};

export const fetchLocation = async (searchedLocation: string | number[]): Promise<City[] | null> => {
	const locationUrl = `${BASE_URL}/search.json?q=${searchedLocation}`;

	try {
		const response = await fetch(locationUrl);

		if (!response.ok) {
			throw new Error(`Location request failed (${response.status})`);
		}

		const locationData = (await response.json()) as City[];

		if (!locationData) {
			throw new Error("Can't fetch suggestions");
		}

		return locationData;
	} catch (error) {
		console.error('Failed to fetch suggestions data:', error);
		return null;
	}
};
