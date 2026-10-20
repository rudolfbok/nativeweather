import { useTranslate } from '@tolgee/react';
import { useFavoriteCityWeather as useFavoriteCityWeatherData } from '@nativeweather/core/hooks/weather/useFavoriteCityWeather';
import type { City } from '@nativeweather/types/city';
import { showFavoriteToast } from '../../utils/notifications/showFavoriteToast';
import { showToast } from '../../utils/notifications/showToast';

interface RefreshFavoritesProps {
	displayToast?: boolean;
	setRefreshing?: (value: boolean) => void;
}

export const useFavoriteCityWeather = ({ refresh = false }: { refresh?: boolean } = {}) => {
	const { t } = useTranslate('common');
	const favorites = useFavoriteCityWeatherData({ refresh });

	const refreshFavoriteCities = async ({ displayToast = true, setRefreshing }: RefreshFavoritesProps = {}) => {
		setRefreshing?.(true);
		const result = await favorites.refreshFavoriteCities({
			showLoading: displayToast,
			onSettled: () => setRefreshing?.(false),
		});
		if (displayToast && result && (result.hasFavorites || result.hasError)) {
			showToast({
				message: result.hasError ? t('toast.notrefreshed') : t('toast.refreshed'),
				preset: result.hasError ? 'error' : 'done',
			});
		}
	};

	const handleRemoveCity = async (city: City) => {
		const success = favorites.handleRemoveCity(city);
		showFavoriteToast({ message: t('toast.remove', { name: city.name }), type: 'remove' });
		if (!success) await refreshFavoriteCities();
	};

	return { ...favorites, refreshFavoriteCities, handleRemoveCity };
};
