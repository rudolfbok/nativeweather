import { extractCity, isCityInFavorites, useFavoriteCities } from '@nativeweather/core';
import type { NormalizedData } from '@nativeweather/types';
import { showToast } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';

/** Whether the city of this weather is a favourite, and a toggle that confirms with a toast. */
export const useFavoriteToggle = (weather: NormalizedData) => {
	const { t } = useTranslate('common');
	const { favoriteCitiesValue, handleFavoriteToggle } = useFavoriteCities();
	const city = extractCity(weather);

	return {
		isFavorite: favoriteCitiesValue !== undefined && isCityInFavorites(city),
		label: (isFavorite: boolean) => t(isFavorite ? 'favorites.delete' : 'favorites.title'),
		toggle: () => {
			const type = handleFavoriteToggle(city);
			showToast({ message: t(`toast.${type}`, { name: city.name }), type });
		},
	};
};
