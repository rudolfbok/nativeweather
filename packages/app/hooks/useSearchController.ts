import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { fetchLocation } from 'app/api/fetchWeatherAPI';
import { City } from 'app/storage/crudMMKVService';
import { useStorageObject } from 'app/storage/useStorageObject';
import { buildWeatherSlug } from 'app/utils/services/buildWeatherSlug';
import { showToast } from 'app/utils/services/showToast';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { useWeather } from './useWeather';
import { useStorageString } from 'app/storage/useStorageString';

export const useSearchController = () => {
	const { t } = useTranslate('common');
	const { setWeatherData } = useWeather();
	const [currentSource] = useStorageString('currentSource');
	const [recentSearches, setRecentSearches] = useStorageObject<City[]>('savedRecents');
	const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [suggestions, setSuggestions] = useState<City[]>([]);
	const [loading, setLoading] = useState(false);
	// const inputRef = useRef<TextInput>(null);
	const debounceTimerRef = useRef<number | null>(null);

	const router = useRouter();

	const showRecentSearches =
		Platform.OS === 'web'
			? isSearchBarFocused && (recentSearches || []).length > 0 && searchValue.length === 0
			: (recentSearches || []).length > 0 && searchValue.length === 0;

	const showSuggestions = isSearchBarFocused && suggestions.length > 0;

	const handleCityPress = async (city: City) => {
		const weatherData = await fetchWeather(`${city.name}, ${city.region}, ${city.country}`, currentSource);
		if (weatherData) {
			setWeatherData(weatherData);
			const path = buildWeatherSlug(weatherData);
			router.push(path);
		} else {
			showToast({
				message: t('search.city.error'),
				preset: 'error',
			});
			console.error('Failed to fetch weather data for saved city');
		}
	};

	const handleInputSearch = async (query: string) => {
		const weatherData = await fetchWeather(query, currentSource);
		if (weatherData) {
			setWeatherData(weatherData);
			setIsSearchBarFocused(false);
			setSearchValue('');
			const path = buildWeatherSlug(weatherData);
			router.push(path);
		} else {
			showToast({ message: t('search.input.error'), preset: 'error' });
		}
	};

	useEffect(() => {
		const run = async () => {
			if (!searchValue.trim()) {
				setSuggestions([]);
				return;
			}

			const suggestionsData = await fetchLocation(searchValue);

			if (suggestionsData) {
				setSuggestions(suggestionsData);
			} else {
				setSuggestions([]);
			}
		};

		run();

		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, [searchValue]);

	const addToRecentSearches = (city: City) => {
		const newSearches = [
			city,
			...(recentSearches || []).filter(
				(item) => !(item.name === city.name && item.region === city.region && item.country === city.country)
			),
		].slice(0, 10);

		setRecentSearches(newSearches);
	};

	return {
		searchValue,
		setSearchValue,
		isSearchBarFocused,
		setIsSearchBarFocused,
		recentSearches,
		handleCityPress,
		handleInputSearch,
		showRecentSearches,
		showSuggestions,
		suggestions,
		addToRecentSearches,
		loading,
	};
};
