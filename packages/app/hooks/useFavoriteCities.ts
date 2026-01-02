import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import {
	addFavoriteCity,
	City,
	getFavoriteCities,
	isCityInFavorites,
	isSameCity,
	removeFavoriteCity,
} from 'app/storage/crudMMKVService';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { CityCardWeather } from 'app/types/cityCardWeather';
import { showToast } from 'app/utils/showToast';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useLocalWeather } from './useLocalWeather';

export interface FavoriteCity {
	city: City;
	weather: CityCardWeather;
}

interface RefreshFavoritesProps {
	displayToast?: boolean;
	setRefreshing?: (v: boolean) => void;
}

export const useFavoriteCities = () => {
	const { t } = useTranslate('common');
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const { localWeatherData, setLocalWeatherData } = useLocalWeather();
	const [favoritesData, setFavoritesData] = useState<FavoriteCity[]>([]);
	const [loading, setLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState<boolean>(undefined);

	const refreshFavoriteCities = async ({ displayToast = true, setRefreshing }: RefreshFavoritesProps = {}) => {
		setLoading(true);
		setRefreshing?.(true);

		const cities = getFavoriteCities();

		if (showLocalWeather && localWeatherData) {
			const weatherData = await fetchWeather(`${localWeatherData.location.name}, ${localWeatherData.location.country}`);
			if (!weatherData) return null;
			setLocalWeatherData(weatherData);
		}

		const results = await Promise.all(
			cities.map(async (city: City) => {
				const weatherData = await fetchWeather(`${city.name}, ${city.region}, ${city.country}`);

				if (!weatherData) {
					if (displayToast) {
						showToast({ message: t('toast.notrefreshed'), type: 'error' });
					}

					return null;
				}
				if (displayToast) {
					showToast({ message: t('toast.refreshed'), type: 'done' });
				}
				return { city, weather: weatherData };
			})
		);

		setFavoritesData(results.filter(Boolean));
		setRefreshing?.(false);
		setLoading(false);
	};

	const handleRemoveCity = async (city: City) => {
		setFavoritesData((prev) => prev.filter((item) => !isSameCity(item.city, city)));

		const success = removeFavoriteCity(city);
		showToast({
			message: `${city.name} ${t('toast.remove')}`,
			type: 'done',
		});
		if (!success) {
			await refreshFavoriteCities();
		}
	};

	const handleFavoriteToggle = async (city: City) => {
		const isAlreadyFavorite = isCityInFavorites(city);

		if (isAlreadyFavorite) {
			removeFavoriteCity(city);
			setIsFavorite(false);
			showToast({
				message: `${city.name} ${t('toast.remove')}`,
				type: Platform.OS === 'web' ? 'error' : 'custom',
				iosIcon: 'star.slash',
				iosIconColor: '#FE9804',
			});
		} else {
			addFavoriteCity(city);
			setIsFavorite(true);
			showToast({
				message: `${city.name} ${t('toast.add')}`,
				type: Platform.OS === 'web' ? 'done' : 'custom',
				iosIcon: 'star.fill',
				iosIconColor: '#FE9804',
			});
		}
	};

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
