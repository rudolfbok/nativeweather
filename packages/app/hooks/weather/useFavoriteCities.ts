import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import {
	addFavoriteCity,
	getFavoriteCities,
	isCityInFavorites,
	isSameCity,
	removeFavoriteCity,
} from 'app/storage/crudMMKVService';
import { useStorageBoolean, useStorageString } from 'app/storage/useStorage';
import { CityCard } from 'app/types/cityCard';
import type { City } from 'app/types/city';
import { showFavoriteToast } from 'app/utils/services/showFavoriteToast';
import { showToast } from 'app/utils/services/showToast';
import { useEffect, useRef, useState } from 'react';
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
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const localWeatherData = useLocalWeather((state) => state.localWeatherData);
	const setLocalWeatherData = useLocalWeather((state) => state.setLocalWeatherData);
	const [favoritesData, setFavoritesData] = useState<FavoriteCity[]>([]);
	const [loading, setLoading] = useState(refresh);
	const [isFavorite, setIsFavorite] = useState<boolean>(undefined);
	const refreshAbortRef = useRef<AbortController | null>(null);

	const refreshFavoriteCities = async ({ displayToast = true, setRefreshing }: RefreshFavoritesProps = {}) => {
		refreshAbortRef.current?.abort();
		const controller = new AbortController();
		refreshAbortRef.current = controller;
		setLoading(true);
		setRefreshing?.(true);

		try {
			const cities = getFavoriteCities();
			let localRefreshFailed = false;

			if (showLocalWeather && localWeatherData) {
				const weatherData = await fetchWeather(
					`${localWeatherData.location.name}, ${localWeatherData.location.country}`,
					currentSource,
					{ signal: controller.signal }
				);
				if (controller.signal.aborted) return;
				if (weatherData) await setLocalWeatherData(weatherData);
				else localRefreshFailed = true;
			}

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

			setFavoritesData(results.filter(Boolean));
		} finally {
			if (refreshAbortRef.current === controller) {
				setRefreshing?.(false);
				setLoading(false);
			}
		}
	};

	const handleRemoveCity = async (city: City) => {
		setFavoritesData((prev) => prev.filter((item) => !isSameCity(item.city, city)));

		const success = removeFavoriteCity(city);
		showFavoriteToast({ message: `${city.name} ${t('toast.remove')}`, type: 'remove' });
		if (!success) {
			await refreshFavoriteCities();
		}
	};

	const handleFavoriteToggle = async (city: City) => {
		const isAlreadyFavorite = isCityInFavorites(city);

		if (isAlreadyFavorite) {
			removeFavoriteCity(city);
			setIsFavorite(false);
			showFavoriteToast({ message: `${city.name} ${t('toast.remove')}`, type: 'remove' });
		} else {
			addFavoriteCity(city);
			setIsFavorite(true);
			showFavoriteToast({ message: `${city.name} ${t('toast.add')}`, type: 'add' });
		}
	};

	useEffect(() => {
		if (refresh) void refreshFavoriteCities({ displayToast: false });
	}, [currentSource, refresh]);

	useEffect(
		() => () => {
			refreshAbortRef.current?.abort();
		},
		[]
	);

	return {
		favoritesData,
		loading,
		refreshFavoriteCities,
		handleRemoveCity,
		handleFavoriteToggle,
		isFavorite,
		setIsFavorite,
		// refreshing,
	};
};
