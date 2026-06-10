const BASE_URL = 'https://nativeweather-api.bitwebs.workers.dev';

export const fetchWeatherAPI = async (query: string | number[]) => {
	const weatherUrl = `${BASE_URL}/forecast.json?q=${query}`;

	try {
		const response = await fetch(weatherUrl);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const weatherData = await response.json();

		if (!weatherData) {
			throw new Error('City not found');
		}

		return weatherData;
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return { error: error.message || 'An unknown error occurred' };
	}
};

export const fetchLocation = async (searchedLocation: string | number[]) => {
	const locationUrl = `${BASE_URL}/search.json?q=${searchedLocation}`;

	try {
		const response = await fetch(locationUrl);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const locationData = await response.json();

		if (!locationData) {
			throw new Error("Can't fetch suggestions");
		}

		return locationData;
	} catch (error) {
		console.error('Failed to fetch suggestions data:', error);
		return { error: error.message || 'An unknown error occurred' };
	}
};
