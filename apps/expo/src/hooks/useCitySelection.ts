import { fetchWeather } from '@nativeweather/api';
import { useCitySearch } from '@/core';
import type { City } from '@nativeweather/types';
import { showToast } from '@/ui';
import { useTranslate } from '@tolgee/react';
import { openCity } from '@/navigation';

/** City search that opens the chosen city, shared by the search screen and the web header. */
export const useCitySelection = () => {
	const { t } = useTranslate('common');
	const { query, setQuery, suggestions, recents, addRecent } = useCitySearch();

	const selectCity = (city: City) => {
		addRecent(city);
		setQuery('');
		openCity(city);
	};

	// Free text and coordinates have no name yet, so the weather is fetched to learn it.
	const submit = async () => {
		const text = query.trim();
		if (!text) return;
		const weather = await fetchWeather(text);
		if (!weather) {
			showToast({ message: t('search.input.error'), type: 'error' });
			return;
		}
		setQuery('');
		openCity(weather.location);
	};

	return { query, setQuery, cities: query.trim() ? suggestions : recents, selectCity, submit };
};
