import { NormalizedData } from 'app/types/normalizedData';
import { countryCode } from './countryCode';

export const buildSlug = (weatherData: NormalizedData): string => {
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
	const code = countryCode(weatherData.location.country);

	return `/${citySlug}?r=${encodeURIComponent(regionSlug)}&cr=${encodeURIComponent(code)}`;
};
