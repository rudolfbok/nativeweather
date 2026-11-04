export { storage } from './database/initStorage';
export { initStorageDefaults } from './database/initStorageDefaults';
export { booleanStorageDefaults, stringStorageDefaults } from './database/storageDefaults';
export { useStorageBoolean, useStorageObject, useStorageString } from './database/useStorage';
export {
	addFavoriteCity,
	getFavoriteCities,
	getFavoritesStorageInfo,
	isCityInFavorites,
	isSameCity,
	removeFavoriteCity,
} from './database/crudMMKVService';
export { useLocation } from './hooks/location/useLocation';
export { LocalWeatherError, isExpectedLocationError, toLocalWeatherError } from './hooks/location/locationError';
export type { LocalWeatherErrorKind } from './hooks/location/locationError';
export { useWeather } from './hooks/weather/useWeather';
export { useLocalWeather } from './hooks/weather/useLocalWeather';
export { useFavoriteCities } from './hooks/weather/useFavoriteCities';
export { useFavoriteCityWeather } from './hooks/weather/useFavoriteCityWeather';
export type { FavoriteCity } from './hooks/weather/useFavoriteCityWeather';
export { useSunEvent } from './hooks/weather/useSunEvent';
export { availableLanguages, localeData } from './locales';
export { getAlerts, getMostSevereAlert } from './utils/alertFilters';
export { countryCode } from './utils/countryCode';
export { extractCity, getCityRegion } from './utils/extractCity';
export { buildSlug } from './utils/weatherSlug';
export { formatTemperature } from './utils/formatting/formatTemperature';
export { formatTime } from './utils/formatting/formatTime';
export { selectUnit } from './utils/formatting/selectUnit';
export {
	EUAQIIndicatorColor,
	USAQIIndicatorColor,
	PM25IndicatorColor,
	PM10IndicatorColor,
	OzoneIndicatorColor,
	NO2IndicatorColor,
} from './utils/mappings/airQuality';
export { getAlertSeverityTextColor, getAlertSeverityDotColor } from './utils/mappings/alertSeverity';
export { weatherLandscapeBg } from './utils/mappings/landscapeColors';
export { getDirection } from './utils/mappings/windDirection';
