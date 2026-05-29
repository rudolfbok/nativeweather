'use client';

import { useNavigation } from '@react-navigation/native';
import { useTranslate } from '@tolgee/react';
import { RecentSearches } from 'app/components/weather/search/RecentSearches';
import { SuggestionsList } from 'app/components/weather/search/SuggestionsList';
import { useSearchController } from 'app/hooks/useSearchController';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { SearchBarCommands } from 'react-native-screens';

export const SearchFeature = () => {
	const {
		searchValue,
		setSearchValue,
		setIsSearchBarFocused,
		recentSearches,
		handleCityPress,
		handleInputSearch,
		showRecentSearches,
		showSuggestions,
		suggestions,
		addToRecentSearches,
	} = useSearchController();

	const { t } = useTranslate('common');
	const navigation = useNavigation();
	const searchBarRef = useRef<SearchBarCommands | null>(null);

	useEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				ref: searchBarRef,
				placeholder: t('search.searchbar.native'),
				onChangeText: (event) => setSearchValue(event.nativeEvent.text),
				onSearchButtonPress: async () => {
					const success = await handleInputSearch(searchValue);
					if (!success) {
						searchBarRef.current?.clearText();
					}
				},
				onFocus: () => setIsSearchBarFocused(true),
				onBlur: () => setIsSearchBarFocused(false),
				// hideNavigationBar: false,
			},
		});
	}, [navigation, searchValue]);

	return (
		<Animated.ScrollView
			contentInsetAdjustmentBehavior="automatic"
			showsVerticalScrollIndicator={true}
			contentContainerClassName={clsx('px-4 pb-4')}
		>
			{showRecentSearches && (
				<View className={clsx('w-full')}>
					<RecentSearches recentSearches={recentSearches} onSelect={(item) => handleCityPress(item)} />
				</View>
			)}
			{showSuggestions && (
				<View className={clsx('w-full')}>
					<SuggestionsList
						suggestions={suggestions}
						onSelect={(item) => {
							handleCityPress(item);
							addToRecentSearches(item);
							setSearchValue('');
						}}
					/>
				</View>
			)}
		</Animated.ScrollView>
	);
};
