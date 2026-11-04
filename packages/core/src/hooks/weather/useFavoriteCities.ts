import {
	addFavoriteCity,
	getFavoriteCities,
	isCityInFavorites,
	removeFavoriteCity,
} from '../../database/crudMMKVService';
import { useStorageString } from '../../database/useStorage';
import type { City } from '@nativeweather/types';

const handleFavoriteToggle = (city: City) => {
	if (isCityInFavorites(city)) {
		removeFavoriteCity(city);
		return 'remove' as const;
	}
	addFavoriteCity(city);
	return 'add' as const;
};

export const useFavoriteCities = () => {
	const [favoriteCitiesValue] = useStorageString('favoriteCities');

	return {
		favoriteCitiesValue,
		favoriteCount: favoriteCitiesValue === undefined ? 0 : getFavoriteCities().length,
		handleFavoriteToggle,
	};
};
