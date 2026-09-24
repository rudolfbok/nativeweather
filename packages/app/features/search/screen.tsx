'use client';

import { Stack } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { RecentSearches } from 'app/components/weather/search/RecentSearches';
import { SuggestionsList } from 'app/components/weather/search/SuggestionsList';
import { useSearchController } from 'app/hooks/search/useSearchController';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { SearchBarCommands } from 'react-native-screens';

export const SearchFeature = () => {
	const {
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
	const searchBarRef = useRef<SearchBarCommands | null>(null);

	return (
		<>
			<Stack.SearchBar
				ref={searchBarRef}
				placeholder={t('search.searchbar.native')}
				placement="automatic"
				hideWhenScrolling={false}
				obscureBackground={false}
				onChangeText={(event) => setSearchValue(event.nativeEvent.text)}
				onSearchButtonPress={async (event) => {
					await handleInputSearch(event.nativeEvent.text);
					searchBarRef.current?.clearText();
				}}
				onCancelButtonPress={() => {
					setSearchValue('');
					setIsSearchBarFocused(false);
				}}
				onFocus={() => setIsSearchBarFocused(true)}
				onBlur={() => setIsSearchBarFocused(false)}
			/>
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
		</>
	);
};
