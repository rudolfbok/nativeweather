import { WeatherData } from 'app/types/weatherData';
import { countryNameToCode } from './contryNameToCode';

export const buildWeatherSlug = (weatherData: WeatherData) => {
	if (!weatherData) return null;

	const citySlug = weatherData.location.name
		.trim()
		.toLowerCase()
		.replace(/[\[\]\(\)]/g, '')
		.replace(/\s+/g, '-');
	const regionSlug =
		weatherData.location.region
			.trim()
			.toLowerCase()
			.replace(/[\s,]+/g, '-') || citySlug;
	const countryCode = countryNameToCode(weatherData.location.country);

	return `/${citySlug}?r=${encodeURIComponent(regionSlug)}&cr=${encodeURIComponent(countryCode)}`;
};
