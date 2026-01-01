const API_KEY = 'REDACTED_API_KEY';
const BASE_URL = 'https://api.weatherapi.com/v1/';

export const fetchWeather = async (query) => {
	const weatherUrl = `${BASE_URL}forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no&alerts=yes`;

	try {
		const response = await fetch(weatherUrl);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const weatherData = await response.json();

		if (!weatherData) {
			throw new Error('City not found');
		}

		return { weatherData };
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return { error: error.message || 'An unknown error occurred' };
	}
};

export const fetchLocation = async (searchedLocation) => {
	const locationUrl = `${BASE_URL}search.json?key=${API_KEY}&q=${searchedLocation}`;

	try {
		const response = await fetch(locationUrl);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const locationData = await response.json();

		if (!locationData) {
			throw new Error('Cant fetch suggestions');
		}

		return { locationData };
	} catch (error) {
		console.error('Failed to fetch suggestions data:', error);
		return { error: error.message || 'An unknown error occurred' };
	}
};

export const fetchSuggestions = async (searchedCity) => {
	const suggestionsUrl = `${BASE_URL}search.json?key=${API_KEY}&q=${searchedCity}`;
	try {
		const response = await fetch(suggestionsUrl);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const suggestionsData = await response.json();

		if (!suggestionsData) {
			throw new Error('Cant fetch suggestions');
		}

		return { suggestionsData };
	} catch (error) {
		console.error('Failed to fetch suggestions data:', error);
		return { error: error.message || 'An unknown error occurred' };
	}
};
