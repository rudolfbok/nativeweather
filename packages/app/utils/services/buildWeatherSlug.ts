import { countryNameToCode } from '../helpers/countryNameToCode';

export const buildWeatherSlug = (weatherData: any): string => {
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
