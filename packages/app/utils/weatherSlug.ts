import { NormalizedData } from 'app/types/normalizedData';
import { countryCode } from './countryCode';

const normalizeSlug = (value: string) =>
	value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

export const buildSlug = (weatherData: NormalizedData): string => {
	if (!weatherData) return null;

	const citySlug = normalizeSlug(weatherData.location.name);
	const regionSlug = normalizeSlug(weatherData.location.region) || citySlug;
	const code = countryCode(weatherData.location.country);

	return `/${citySlug}?r=${encodeURIComponent(regionSlug)}&cr=${encodeURIComponent(code)}`;
};
