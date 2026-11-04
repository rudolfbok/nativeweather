import { storage } from './initStorage';
import type { City } from '@nativeweather/types';

const defaultFavoriteCities: City[] = [
	{ name: 'Praha', region: 'Hlavni mesto Praha', country: 'Czech Republic' },
	{ name: 'New York', region: 'New York', country: 'United States of America' },
	{ name: 'Osaka-Shi', region: 'Osaka', country: 'Japan' },
	{ name: 'London', region: 'City of London, Greater London', country: 'United Kingdom' },
];

export const isSameCity = (a: City, b: City) => a.name === b.name && a.region === b.region && a.country === b.country;

export const getFavoriteCities = (): City[] => {
	try {
		const data = storage.getString('favoriteCities');

		if (data === undefined) {
			const favorites = [...defaultFavoriteCities];
			storage.set('favoriteCities', JSON.stringify(favorites));
			return favorites;
		}

		if (!data) return [];

		const parsed = JSON.parse(data);
		if (Array.isArray(parsed)) {
			return parsed.filter(
				(city: City) =>
					typeof city === 'object' &&
					city !== null &&
					typeof city.name === 'string' &&
					typeof city.region === 'string' &&
					typeof city.country === 'string'
			);
		}
		return [];
	} catch (error) {
		console.error('Error reading favorite cities:', error);
		return [];
	}
};

export const addFavoriteCity = (city: City): boolean => {
	try {
		if (!city.name || !city.region || !city.country) {
			console.warn('City object is invalid - all fields (name, region, country) are required.');
			return false;
		}

		const favorites = getFavoriteCities();

		const isDuplicate = favorites.some((fav) => isSameCity(fav, city));

		if (isDuplicate) {
			console.warn('City is already in favorites.');
			return false;
		}

		const updatedFavorites = [city, ...favorites];
		storage.set('favoriteCities', JSON.stringify(updatedFavorites));
		return true;
	} catch (error) {
		console.error('Error adding favorite city:', error);
		console.warn('Error adding favorite city');
		return false;
	}
};

export const removeFavoriteCity = (city: City): boolean => {
	try {
		if (!city.name || !city.region || !city.country) {
			console.warn('City object is invalid.');
			return false;
		}

		const favorites = getFavoriteCities();

		const updatedFavorites = favorites.filter((fav) => !isSameCity(fav, city));

		if (favorites.length === updatedFavorites.length) {
			console.warn('City not found in favorites.');
			return false;
		}

		storage.set('favoriteCities', JSON.stringify(updatedFavorites));
		return true;
	} catch (error) {
		console.error('Error removing favorite city:', error);
		return false;
	}
};

export const isCityInFavorites = (city: City): boolean => {
	try {
		const favorites = getFavoriteCities();

		return favorites.some((fav) => isSameCity(fav, city));
	} catch {
		return false;
	}
};

// Helper function to get storage info (useful for debugging)
export const getFavoritesStorageInfo = () => {
	try {
		const allKeys = storage.getAllKeys();
		return {
			keys: allKeys,
			size: storage.byteSize,
			hasFavorites: storage.contains('favoriteCities'),
		};
	} catch (error) {
		console.error('Error getting storage info:', error);
		return null;
	}
};
