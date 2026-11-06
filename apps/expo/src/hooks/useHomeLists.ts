import { useFavoriteCityWeather, useLocation, useStorageBoolean } from '@/core';
import type { City } from '@nativeweather/types';
import { showToast } from '@/ui';
import { useTranslate } from '@tolgee/react';
import { useEffect } from 'react';

/** Local weather and favourites with their toasts, shared by the home screen and the desktop sidebar. */
export const useHomeLists = () => {
	const { t } = useTranslate('common');
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const favorites = useFavoriteCityWeather({ refresh: true });
	const { getLocalWeather, error } = useLocation();

	useEffect(() => {
		if (showLocalWeather) void getLocalWeather();
	}, [showLocalWeather, getLocalWeather]);

	const onRemove = (city: City) => {
		favorites.handleRemoveCity(city);
		showToast({ message: t('toast.remove', { name: city.name }), type: 'remove' });
	};

	return { showLocalWeather, favorites, error, onRemove };
};
