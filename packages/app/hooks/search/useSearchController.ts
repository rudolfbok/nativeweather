import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { fetchLocation } from 'app/api/fetchWeatherAPI';
import { useStorageObject, useStorageString } from 'app/database/useStorage';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { useWeather } from 'app/hooks/weather/useWeather';
import type { City } from 'app/types/city';
import { showToast } from 'app/utils/notifications/showToast';
import { buildSlug } from 'app/utils/weatherSlug';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export const useSearchController = () => {
	const { t } = useTranslate('common');
	const { setWeatherData } = useWeather();
	const [currentSource] = useStorageString('currentSource');
	const [recentSearches, setRecentSearches] = useStorageObject<City[]>('savedRecents');
	const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [suggestions, setSuggestions] = useState<City[]>([]);
	const [weatherLoading, setWeatherLoading] = useState(false);
	// const inputRef = useRef<TextInput>(null);
	const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const suggestionAbortRef = useRef<AbortController | null>(null);
	const weatherAbortRef = useRef<AbortController | null>(null);
	const { setNavigationScreen } = useNavigationScreen();

	const router = useRouter();

	const showRecentSearches = Platform.select({
		macos: (recentSearches || []).length > 0 && searchValue.length === 0,
		web: isSearchBarFocused && (recentSearches || []).length > 0 && searchValue.length === 0,
		default: (recentSearches || []).length > 0 && searchValue.length === 0,
	});

	const showSuggestions = isSearchBarFocused && suggestions.length > 0;

	const handleCityPress = async (city: City) => {
		weatherAbortRef.current?.abort();
		const controller = new AbortController();
		weatherAbortRef.current = controller;
		setWeatherLoading(true);
		const weatherData = await fetchWeather(`${city.name}, ${city.region}, ${city.country}`, currentSource, {
			signal: controller.signal,
		});
		if (controller.signal.aborted) return false;
		if (weatherData) {
			setWeatherData(weatherData);
			if (Platform.OS === 'macos') {
				setNavigationScreen('weather');
			} else {
				const path = buildSlug(weatherData);
				router.push(path);
			}
		} else {
			showToast({
				message: t('search.city.error'),
				preset: 'error',
			});
			console.error('Failed to fetch weather data for saved city');
		}
		setWeatherLoading(false);
		return Boolean(weatherData);
	};

	const handleInputSearch = async (query: string) => {
		weatherAbortRef.current?.abort();
		const controller = new AbortController();
		weatherAbortRef.current = controller;
		setWeatherLoading(true);
		const weatherData = await fetchWeather(query, currentSource, { signal: controller.signal });
		if (controller.signal.aborted) return false;
		if (weatherData) {
			setWeatherData(weatherData);
			setIsSearchBarFocused(false);
			setSearchValue('');
			if (Platform.OS === 'macos') {
				setNavigationScreen('weather');
			} else {
				const path = buildSlug(weatherData);
				router.push(path);
			}
			setWeatherLoading(false);
			return true;
		} else {
			showToast({ message: t('search.input.error'), preset: 'error' });
			setSearchValue('');
			setWeatherLoading(false);
			return false;
		}
	};

	useEffect(() => {
		suggestionAbortRef.current?.abort();
		if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

		if (!searchValue.trim()) {
			setSuggestions([]);
			return;
		}

		debounceTimerRef.current = setTimeout(async () => {
			const controller = new AbortController();
			suggestionAbortRef.current = controller;
			const suggestionsData = await fetchLocation(searchValue, { signal: controller.signal });

			if (!controller.signal.aborted) setSuggestions(suggestionsData ?? []);
		}, 250);

		return () => {
			if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
			suggestionAbortRef.current?.abort();
		};
	}, [searchValue]);

	useEffect(
		() => () => {
			weatherAbortRef.current?.abort();
		},
		[]
	);

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
		weatherLoading,
	};
};
