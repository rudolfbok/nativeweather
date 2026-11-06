import { getCityRoute } from '@nativeweather/core';
import { router } from 'expo-router';

/** Opens a city's weather page; a weather location or a search result both work. */
export const openCity = (location: Parameters<typeof getCityRoute>[0]) =>
	router.push({ pathname: '/[city]', params: getCityRoute(location) });
