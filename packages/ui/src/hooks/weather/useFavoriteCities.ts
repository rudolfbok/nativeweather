import { useTranslate } from '@tolgee/react';
import { fetchWeather } from '@nativeweather/api/fetchWeather';
import {
	addFavoriteCity,
	getFavoriteCities,
	isCityInFavorites,
	isSameCity,
	removeFavoriteCity,
} from '@nativeweather/core/database/crudMMKVService';
import { useStorageBoolean, useStorageString } from '@nativeweather/core/database/useStorage';
import { CityCard } from '@nativeweather/types/cityCard';
import type { City } from '@nativeweather/types/city';
import { showFavoriteToast } from '@nativeweather/ui/utils/notifications/showFavoriteToast';
import { showToast } from '@nativeweather/ui/utils/notifications/showToast';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalWeather } from './useLocalWeather';

export interface FavoriteCity {
	city: City;
	weather: CityCard;
}

interface RefreshFavoritesProps {
	displayToast?: boolean;
	setRefreshing?: (v: boolean) => void;
}

export const useFavoriteCities = ({ refresh = false }: { refresh?: boolean } = {}) => {
	const { t } = useTranslate('common');
	const [currentSource] = useStorageString('currentSource');
	const [favoriteCitiesValue] = useStorageString('favoriteCities');
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const [favoritesData, setFavoritesData] = useState<FavoriteCity[]>([]);
	const favoriteCount = favoriteCitiesValue === undefined ? 0 : getFavoriteCities().length;
	const [loading, setLoading] = useState(refresh);
	const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);
	const refreshAbortRef = useRef<AbortController | null>(null);

	const refreshFavoriteCities = useCallback(async ({ displayToast = true, setRefreshing }: RefreshFavoritesProps = {}) => {
		refreshAbortRef.current?.abort();
		const controller = new AbortController();
		refreshAbortRef.current = controller;
		if (displayToast) setLoading(true);
		setRefreshing?.(true);

		try {
			const cities = getFavoriteCities();
			let localRefreshFailed = false;

			const localWeatherData = useLocalWeather.getState().localWeatherData;
			if (showLocalWeather && localWeatherData) {
				const weatherData = await fetchWeather(
					[localWeatherData.location.lat, localWeatherData.location.lon],
					currentSource,
					{ signal: controller.signal }
				);
				if (controller.signal.aborted) return;
				if (weatherData) await useLocalWeather.getState().setLocalWeatherData(weatherData);
				else localRefreshFailed = true;
			}
			if (controller.signal.aborted) return;

			const results = await Promise.all(
				cities.map(async (city: City) => {
					const weatherData = await fetchWeather(`${city.name}, ${city.region}, ${city.country}`, currentSource, {
						signal: controller.signal,
					});

					return weatherData ? { city, weather: weatherData } : null;
				})
			);
			if (controller.signal.aborted) return;

			if (displayToast && (cities.length > 0 || localRefreshFailed)) {
				const hasRefreshError = localRefreshFailed || results.some((result) => !result);

				showToast({
					message: hasRefreshError ? t('toast.notrefreshed') : t('toast.refreshed'),
					preset: hasRefreshError ? 'error' : 'done',
				});
			}

			setFavoritesData(results.filter((result): result is NonNullable<typeof result> => result !== null));
		} finally {
			if (refreshAbortRef.current === controller) {
				setRefreshing?.(false);
				setLoading(false);
			}
		}
	}, [currentSource, showLocalWeather, t]);

	const handleRemoveCity = async (city: City) => {
		setFavoritesData((prev) => prev.filter((item) => !isSameCity(item.city, city)));

		const success = removeFavoriteCity(city);
		showFavoriteToast({ message: t('toast.remove', { name: city.name }), type: 'remove' });
		if (!success) {
			await refreshFavoriteCities();
		}
	};

	const handleFavoriteToggle = async (city: City) => {
		const isAlreadyFavorite = isCityInFavorites(city);

		if (isAlreadyFavorite) {
			removeFavoriteCity(city);
			setIsFavorite(false);
			showFavoriteToast({ message: t('toast.remove', { name: city.name }), type: 'remove' });
		} else {
			addFavoriteCity(city);
			setIsFavorite(true);
			showFavoriteToast({ message: t('toast.add', { name: city.name }), type: 'add' });
		}
	};

	useEffect(() => {
		if (!refresh || favoriteCitiesValue === undefined) return;
		const timeout = setTimeout(() => void refreshFavoriteCities({ displayToast: false }), 0);
		return () => clearTimeout(timeout);
	}, [favoriteCitiesValue, refresh, refreshFavoriteCities]);

	useEffect(
		() => () => {
			refreshAbortRef.current?.abort();
		},
		[]
	);

	return {
		favoritesData,
		favoriteCount,
		loading,
		refreshFavoriteCities,
		handleRemoveCity,
		handleFavoriteToggle,
		isFavorite,
		setIsFavorite,
		// refreshing,
	};
};
