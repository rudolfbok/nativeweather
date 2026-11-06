import { fetchLocation } from '@nativeweather/api';
import type { City } from '@nativeweather/types';
import { useEffect, useState } from 'react';
import { isSameCity } from '../../database/crudMMKVService';
import { useStorageObject } from '../../database/useStorage';

const debounceMs = 250;
const maxRecents = 10;

/** The text being searched, its suggestions (debounced, the previous request is aborted) and the recent picks. */
export const useCitySearch = () => {
	const [recents = [], setRecents] = useStorageObject<City[]>('savedRecents');
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState<City[]>([]);

	useEffect(() => {
		if (!query.trim()) return;

		const controller = new AbortController();
		const timeout = setTimeout(() => {
			void fetchLocation(query, { signal: controller.signal }).then((found) => {
				if (!controller.signal.aborted) setSuggestions(found ?? []);
			});
		}, debounceMs);

		return () => {
			clearTimeout(timeout);
			controller.abort();
		};
	}, [query]);

	const addRecent = (city: City) =>
		setRecents([city, ...recents.filter((recent) => !isSameCity(recent, city))].slice(0, maxRecents));

	return { query, setQuery, suggestions: query.trim() ? suggestions : [], recents, addRecent };
};
