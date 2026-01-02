import { fetchSuggestions, fetchWeather } from 'app/api/fetchWeather';
import { City } from 'app/storage/crudMMKVService';
import { useStorageObject } from 'app/storage/useStorageObject';
import { buildWeatherSlug } from 'app/utils/helpers/buildWeatherSlug';
import { showToast } from 'app/utils/showToast';
import { useEffect, useRef, useState } from 'react';
import { Platform, TextInput } from 'react-native';
import { useRouter } from 'solito/navigation';
import { useWeather } from './useWeather';

export const useSearchController = () => {
	const { setWeatherData } = useWeather();
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
		const weatherData = await fetchWeather(`${city.name}, ${city.region}, ${city.country}`);
		if (weatherData) {
			setWeatherData(weatherData);
			const path = buildWeatherSlug(weatherData);
			router.push(path);
		} else {
			console.error('Failed to fetch weather data for saved city');
			showToast({
				message: 'Error loading weather for the selected city. Please try again.',
				type: 'error',
			});
		}
	};

	const handleInputSearch = async (query: string) => {
		const weatherData = await fetchWeather(query);
		if (weatherData) {
			setWeatherData(weatherData);
			setIsSearchBarFocused(false);
			setSearchValue('');
			const path = buildWeatherSlug(weatherData);
			router.push(path);
		} else {
			showToast({ message: 'Bad input try again.', type: 'error' });
			console.log('Failed to fetch weather data for searched city');
		}
	};

	useEffect(() => {
		const run = async () => {
			if (!searchValue.trim()) {
				setSuggestions([]);
				return;
			}

			const { suggestionsData, error } = await fetchSuggestions(searchValue);

			if (suggestionsData && !error) {
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

	// const handleSearch = async (suggestionOrValue: string | City) => {
	// 	let searchQuery: string;

	// 	if (typeof suggestionOrValue === 'string') {
	// 		searchQuery = removeAccents(suggestionOrValue);
	// 	} else {
	// 		searchQuery = `${removeAccents(suggestionOrValue.name)}, ${suggestionOrValue.region}, ${suggestionOrValue.country}`;
	// 	}

	// 	await performSearch(searchQuery);

	// 	console.log('What is searched:' + searchQuery);

	// 	setSearchValue('');
	// 	setSuggestions([]);
	// 	// setShowSuggestions(false);
	// };

	// const handleRecentSearch = async (location: City) => {
	// 	const searchQuery = `${removeAccents(location.name)}, ${location.region}, ${location.country}`;
	// 	await performSearch(searchQuery);
	// };

	// const handleSelectSuggestion = (suggestion: City) => {
	// 	handleSearch(suggestion);
	// 	setSuggestions([]);
	// 	setShowSuggestions(false);
	// };

	// const clearSearch = () => {
	// 	setSearchValue('');
	// 	setShowSuggestions(false);
	// 	setIsXHovered(false);
	// 	inputRef.current?.blur();
	// };

	// useEffect(() => {
	// 	if (debounceTimerRef.current) {
	// 		clearTimeout(debounceTimerRef.current);
	// 	}

	// 	if (searchValue.trim()) {
	// 		debounceTimerRef.current = setTimeout(async () => {
	// 			const { suggestionsData, error } = await fetchSuggestions(searchValue);
	// 			if (suggestionsData && !error) {
	// 				setSuggestions(suggestionsData);
	// 				setShowSuggestions(true);
	// 			} else {
	// 				setSuggestions([]);
	// 			}
	// 		}, 300);
	// 	} else {
	// 		setSuggestions([]);
	// 		setShowSuggestions(false);
	// 	}

	// 	return () => {
	// 		if (debounceTimerRef.current) {
	// 			clearTimeout(debounceTimerRef.current);
	// 		}
	// 	};
	// }, [searchValue]);

	useEffect(() => {
		console.log(searchValue);
	}, [searchValue]);

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
