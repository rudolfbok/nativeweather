import { fetchWeather } from '@nativeweather/api';
import { getFavoriteCities, isSameCity, removeFavoriteCity } from '../../database/crudMMKVService';
import { useStorageBoolean, useStorageString } from '../../database/useStorage';
import { booleanStorageDefaults } from '../../database/storageDefaults';
import type { City, CityCard } from '@nativeweather/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalWeather } from './useLocalWeather';

export interface FavoriteCity {
	city: City;
	weather: CityCard;
}

interface RefreshFavoritesProps {
	showLoading?: boolean;
	onSettled?: () => void;
}

export const useFavoriteCityWeather = ({ refresh = false }: { refresh?: boolean } = {}) => {
	const [favoriteCitiesValue, setFavoriteCitiesValue] = useStorageString('favoriteCities');
	const [showLocalWeather = booleanStorageDefaults.showLocalWeather] = useStorageBoolean('showLocalWeather');
	const [favoritesData, setFavoritesData] = useState<FavoriteCity[]>([]);
	const [loading, setLoading] = useState(refresh);
	const refreshAbortRef = useRef<AbortController | null>(null);

	const refreshFavoriteCities = useCallback(
		async ({ showLoading = true, onSettled }: RefreshFavoritesProps = {}) => {
			refreshAbortRef.current?.abort();
			const controller = new AbortController();
			refreshAbortRef.current = controller;
			if (showLoading) setLoading(true);

			try {
				const cities = getFavoriteCities();
				let localRefreshFailed = false;
				const localWeatherData = useLocalWeather.getState().localWeatherData;

				if (showLocalWeather && localWeatherData) {
					const weatherData = await fetchWeather([localWeatherData.location.lat, localWeatherData.location.lon], {
						signal: controller.signal,
					});
					if (controller.signal.aborted) return;
					if (weatherData) await useLocalWeather.getState().setLocalWeatherData(weatherData);
					else localRefreshFailed = true;
				}
				if (controller.signal.aborted) return;

				const results = await Promise.all(
					cities.map(async (city) => {
						const weatherData = await fetchWeather(`${city.name}, ${city.region}, ${city.country}`, {
							signal: controller.signal,
						});
						return weatherData ? { city, weather: weatherData } : null;
					})
				);
				if (controller.signal.aborted) return;

				const hasError = localRefreshFailed || results.some((result) => !result);

				setFavoritesData(results.filter((result): result is NonNullable<typeof result> => result !== null));
				return { hasError, hasFavorites: cities.length > 0 };
			} finally {
				if (refreshAbortRef.current === controller) {
					onSettled?.();
					setLoading(false);
				}
			}
		},
		[showLocalWeather]
	);

	const handleRemoveCity = (city: City) => {
		setFavoritesData((previous) => previous.filter((item) => !isSameCity(item.city, city)));
		const success = removeFavoriteCity(city);
		setFavoriteCitiesValue(JSON.stringify(getFavoriteCities()));
		return success;
	};

	useEffect(() => {
		if (!refresh || favoriteCitiesValue === undefined) return;
		const timeout = setTimeout(() => void refreshFavoriteCities({ showLoading: false }), 0);
		return () => clearTimeout(timeout);
	}, [favoriteCitiesValue, refresh, refreshFavoriteCities]);

	useEffect(() => () => refreshAbortRef.current?.abort(), []);

	return {
		favoritesData,
		favoriteCount: favoriteCitiesValue === undefined ? 0 : getFavoriteCities().length,
		loading,
		refreshFavoriteCities,
		handleRemoveCity,
	};
};
