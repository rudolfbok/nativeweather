import { useTranslate } from '@tolgee/react';
import { useFavoriteCities as useFavoriteCitiesData } from '@nativeweather/core/hooks/weather/useFavoriteCities';
import type { City } from '@nativeweather/types/city';
import { showFavoriteToast } from '../../utils/notifications/showFavoriteToast';

export const useFavoriteCities = () => {
	const { t } = useTranslate('common');
	const favorites = useFavoriteCitiesData();

	const handleFavoriteToggle = (city: City) => {
		const type = favorites.handleFavoriteToggle(city);
		showFavoriteToast({ message: t(`toast.${type}`, { name: city.name }), type });
	};

	return {
		...favorites,
		handleFavoriteToggle,
	};
};
