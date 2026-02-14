import { fetchLocation } from './fetchWeatherAPI';

const API_KEY = 'REDACTED_API_KEY';
const BASE_URL = 'https://api.openweathermap.org';

export const fetchOpenWeatherAPI = async (city) => {
	try {
		const locationData = await fetchLocation(city);

		if (locationData.error) {
			throw new Error(locationData.error);
		}

		if (!locationData || locationData.length === 0) {
			throw new Error('City not found');
		}

		const firstLocation = locationData[0];
		const { name, region, country, lat, lon } = firstLocation;

		const weatherUrl = `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely&lang=en`;
		const weatherResponse = await fetch(weatherUrl);

		if (!weatherResponse.ok) {
			throw new Error(`Weather API error: ${weatherResponse.status}`);
		}

		const weatherData = await weatherResponse.json();

		return {
			weatherData,
			location: { city: name, region: region ?? '', country },
			latlon: { lat, lng: lon },
			locations: locationData.map((loc) => ({
				city: loc.name,
				region: loc.region,
				country: loc.country,
				lat: loc.lat,
				lon: loc.lon,
			})),
			error: null,
		};
	} catch (error) {
		console.error('Failed to fetch OpenWeather data:', error);
		return {
			error: error.message || 'An unknown error occurred',
		};
	}
};
