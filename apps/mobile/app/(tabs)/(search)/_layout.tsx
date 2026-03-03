import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useSearchController } from 'app/hooks/useSearchController';
import { useEffect } from 'react';

export default function TabLayout() {
	const {
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
	} = useSearchController();

	useEffect(() => console.log(searchValue), [searchValue]);

	return (
		<Stack
			screenOptions={{
				headerTintColor: useSwitchColors('black', 'white'),
				// headerShown: false,
				contentStyle: {
					backgroundColor: useSwitchColors('#F2F2F7', '#000'),
					paddingTop: Platform.OS === 'android' ? 110 : 0,
				},
				headerSearchBarOptions: {
					placeholder: 'Search..',
					onChangeText: (event) => setSearchValue(event.nativeEvent.text),
				},
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
