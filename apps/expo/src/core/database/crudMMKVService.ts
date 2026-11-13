import { storage } from './initStorage';
import { getCityRegion } from '../utils/extractCity';
import type { City } from '@nativeweather/types';

const defaultFavoriteCities: City[] = [
	{ name: 'Praha', region: 'Hlavni mesto Praha', country: 'Czech Republic' },
	{ name: 'New York', region: 'New York', country: 'United States of America' },
	{ name: 'Osaka-Shi', region: 'Osaka', country: 'Japan' },
	{ name: 'London', region: 'City of London, Greater London', country: 'United Kingdom' },
];

const isValidCity = (city: City) =>
	typeof city === 'object' &&
	city !== null &&
	typeof city.name === 'string' &&
	typeof city.region === 'string' &&
	typeof city.country === 'string';

// Region falls back to the name. A region equal to the country is the legacy
// country fallback, so it is treated as missing. This keeps stored favorites
// and freshly fetched cities comparable.
const normalizeCity = (city: City): City => {
	const region = city.region === city.country ? '' : city.region;
	return { ...city, region: getCityRegion({ ...city, region }) };
};

const isSameCityRaw = (a: City, b: City) => a.name === b.name && a.region === b.region && a.country === b.country;

const dedupeCities = (cities: City[]): City[] =>
	cities.reduce<City[]>((acc, city) => (acc.some((c) => isSameCityRaw(c, city)) ? acc : [...acc, city]), []);

const saveFavoriteCities = (cities: City[]) => storage.set('favoriteCities', JSON.stringify(cities));

export const isSameCity = (a: City, b: City) => isSameCityRaw(normalizeCity(a), normalizeCity(b));

export const getFavoriteCities = (): City[] => {
	const data = storage.getString('favoriteCities');

	if (data === undefined) {
		saveFavoriteCities(defaultFavoriteCities);
		return [...defaultFavoriteCities];
	}

	try {
		const parsed: unknown = data ? JSON.parse(data) : [];
		if (!Array.isArray(parsed)) return [];

		const cities = dedupeCities(parsed.filter(isValidCity).map(normalizeCity));
		// Persist the migrated list so legacy entries are only normalized once.
		if (JSON.stringify(cities) !== data) saveFavoriteCities(cities);
		return cities;
	} catch (error) {
		console.error('Error reading favorite cities:', error);
		return [];
	}
};

export const isCityInFavorites = (city: City) => getFavoriteCities().some((fav) => isSameCity(fav, city));

export const addFavoriteCity = (city: City): boolean => {
	if (!city.name || !city.region || !city.country) return false;

	const normalized = normalizeCity(city);
	const favorites = getFavoriteCities();
	if (favorites.some((fav) => isSameCity(fav, normalized))) return false;

	saveFavoriteCities([normalized, ...favorites]);
	return true;
};

export const removeFavoriteCity = (city: City): boolean => {
	const favorites = getFavoriteCities();
	const updatedFavorites = favorites.filter((fav) => !isSameCity(fav, city));
	if (favorites.length === updatedFavorites.length) return false;

	saveFavoriteCities(updatedFavorites);
	return true;
};
