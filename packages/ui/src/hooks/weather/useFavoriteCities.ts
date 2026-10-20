import { useTranslate } from '@tolgee/react';
import {
	addFavoriteCity,
	getFavoriteCities,
	isCityInFavorites,
	removeFavoriteCity,
} from '@nativeweather/core/database/crudMMKVService';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import type { City } from '@nativeweather/types/city';
import { showFavoriteToast } from '@nativeweather/ui/utils/notifications/showFavoriteToast';

export const useFavoriteCities = () => {
	const { t } = useTranslate('common');
	const [favoriteCitiesValue] = useStorageString('favoriteCities');

	const handleFavoriteToggle = (city: City) => {
		if (isCityInFavorites(city)) {
			removeFavoriteCity(city);
			showFavoriteToast({ message: t('toast.remove', { name: city.name }), type: 'remove' });
		} else {
			addFavoriteCity(city);
			showFavoriteToast({ message: t('toast.add', { name: city.name }), type: 'add' });
		}
	};

	return {
		favoriteCitiesValue,
		favoriteCount: favoriteCitiesValue === undefined ? 0 : getFavoriteCities().length,
		handleFavoriteToggle,
	};
};
