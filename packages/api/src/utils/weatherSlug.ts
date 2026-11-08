import type { NormalizedData } from '@nativeweather/types';
import { countryCode } from './countryCode';
import { removeDiacritics } from './removeDiacritics';

const normalizeSlug = (value: string) =>
	removeDiacritics(value)
		.toLowerCase()
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const reservedSlugs = ['search', 'settings', 'metric', 'setting', 'map', 'forecast', 'alerts', 'airquality', 'api'];

/** Top-level routes that the `/[city]` route (and the site Worker) must not treat as a city, in any letter case. */
export const isReservedSlug = (slug: string) => reservedSlugs.includes(slug.toLowerCase());

type SlugLocation = Pick<NormalizedData['location'], 'name' | 'region' | 'country'>;

/** The params of the `/[city]` route. A weather location and a search result both carry a name, a region and a country. */
export const getCityRoute = (location: SlugLocation) => {
	const city = normalizeSlug(location.name);

	return {
		city,
		r: normalizeSlug(location.region) || normalizeSlug(location.country) || city,
		cr: countryCode(location.country),
	};
};

export const buildSlug = (location: SlugLocation): string => {
	const { city, r, cr } = getCityRoute(location);

	return `/${city}?r=${encodeURIComponent(r)}&cr=${encodeURIComponent(cr)}`;
};
