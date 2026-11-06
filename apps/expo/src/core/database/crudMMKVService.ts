import { storage } from './initStorage';
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

const saveFavoriteCities = (cities: City[]) => storage.set('favoriteCities', JSON.stringify(cities));

export const isSameCity = (a: City, b: City) => a.name === b.name && a.region === b.region && a.country === b.country;

export const getFavoriteCities = (): City[] => {
	const data = storage.getString('favoriteCities');

	if (data === undefined) {
		saveFavoriteCities(defaultFavoriteCities);
		return [...defaultFavoriteCities];
	}

	try {
		const parsed: unknown = data ? JSON.parse(data) : [];
		return Array.isArray(parsed) ? parsed.filter(isValidCity) : [];
	} catch (error) {
		console.error('Error reading favorite cities:', error);
		return [];
	}
};

export const isCityInFavorites = (city: City) => getFavoriteCities().some((fav) => isSameCity(fav, city));

export const addFavoriteCity = (city: City): boolean => {
	if (!city.name || !city.region || !city.country) return false;

	const favorites = getFavoriteCities();
	if (favorites.some((fav) => isSameCity(fav, city))) return false;

	saveFavoriteCities([city, ...favorites]);
	return true;
};

export const removeFavoriteCity = (city: City): boolean => {
	const favorites = getFavoriteCities();
	const updatedFavorites = favorites.filter((fav) => !isSameCity(fav, city));
	if (favorites.length === updatedFavorites.length) return false;

	saveFavoriteCities(updatedFavorites);
	return true;
};
