export { storage } from './database/initStorage';
export { initStorageDefaults } from './database/initStorageDefaults';
export { booleanStorageDefaults, stringStorageDefaults } from './database/storageDefaults';
export { useStorageBoolean, useStorageObject, useStorageString } from './database/useStorage';
export {
	addFavoriteCity,
	getFavoriteCities,
	isCityInFavorites,
	isSameCity,
	removeFavoriteCity,
} from './database/crudMMKVService';
export { useCitySearch } from './hooks/search/useCitySearch';
export { useLocation } from './hooks/location/useLocation';
export { LocalWeatherError, isExpectedLocationError, toLocalWeatherError } from './hooks/location/locationError';
export type { LocalWeatherErrorKind } from './hooks/location/locationError';
export { useLocalWeather, useWeather } from './hooks/weather/weatherStore';
export { useAlerts } from './hooks/weather/useAlerts';
export { useCityWeather } from './hooks/weather/useCityWeather';
export { useFavoriteCities } from './hooks/weather/useFavoriteCities';
export { useFavoriteCityWeather } from './hooks/weather/useFavoriteCityWeather';
export type { FavoriteCity } from './hooks/weather/useFavoriteCityWeather';
export { useSunEventCountdown } from './hooks/weather/useSunEventCountdown';
export { availableLanguages, localeData } from './locales';
export * from './utils';
