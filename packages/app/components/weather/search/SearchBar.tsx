import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { useSearchController } from 'app/hooks/search/useSearchController';
import { RecentSearches } from './RecentSearches';
import { SearchInput } from './SearchInput';
import { SuggestionsList } from './SuggestionsList';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

export const SearchBar = () => {
	const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

	useEffect(
		() => () => {
			if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
		},
		[]
	);

	return (
		<>
			<SearchInput
				searchValue={searchValue}
				isFocused={isSearchBarFocused}
				onChangeText={setSearchValue}
				clearSearch={() => setSearchValue('')}
				onFocus={() => {
					if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
					setIsSearchBarFocused(true);
				}}
				performSearch={async () => {
					await handleInputSearch(searchValue);
				}}
				onBlur={() => {
					if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
					blurTimeoutRef.current = setTimeout(() => {
						setIsSearchBarFocused(false);
						blurTimeoutRef.current = null;
					}, 130);
				}}
			/>
			{((Platform.OS === 'macos' && !showSuggestions) || showRecentSearches) && (
				<AnimatedView duration={20} className={clsx('w-full')}>
					<RecentSearches recentSearches={recentSearches} onSelect={(item) => handleCityPress(item)} />
				</AnimatedView>
			)}
			{showSuggestions && (
				<AnimatedView duration={20} className={clsx('w-full')}>
					<SuggestionsList
						suggestions={suggestions}
						onSelect={(item) => {
							handleCityPress(item);
							addToRecentSearches(item);
							setSearchValue('');
						}}
					/>
				</AnimatedView>
			)}
		</>
	);
};
