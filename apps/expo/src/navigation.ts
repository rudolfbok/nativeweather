import { getCityRoute } from '@nativeweather/api';
import { router } from 'expo-router';

/** Opens a city's weather page; a weather location or a search result both work. */
export const openCity = (location: Parameters<typeof getCityRoute>[0]) =>
	router.push({ pathname: '/[city]', params: getCityRoute(location) });

/** Opens a city's weather page in place of the current one, leaving nothing to go back to. */
export const replaceWithCity = (location: Parameters<typeof getCityRoute>[0]) =>
	router.replace({ pathname: '/[city]', params: getCityRoute(location) });
