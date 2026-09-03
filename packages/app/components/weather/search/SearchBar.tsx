import { useSearchController } from 'app/hooks/search/useSearchController';
import { RecentSearches } from './RecentSearches';
import { SearchInput } from './SearchInput';
import { SuggestionsList } from './SuggestionsList';
import { useEffect, useRef } from 'react';

export const SearchBar = ({ onFocusChange }: { onFocusChange?: (isFocused: boolean) => void }) => {
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
					onFocusChange?.(true);
				}}
				performSearch={async () => {
					await handleInputSearch(searchValue);
				}}
				onBlur={() => {
					if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
					blurTimeoutRef.current = setTimeout(() => {
						setIsSearchBarFocused(false);
						onFocusChange?.(false);
						blurTimeoutRef.current = null;
					}, 130);
				}}
			/>
			{showRecentSearches && (
				<RecentSearches
					recentSearches={recentSearches}
					onSelect={(item) => {
						setIsSearchBarFocused(false);
						onFocusChange?.(false);
						handleCityPress(item);
					}}
				/>
			)}
			{showSuggestions && (
				<SuggestionsList
					suggestions={suggestions}
						onSelect={async (item) => {
							setIsSearchBarFocused(false);
							onFocusChange?.(false);
							const loaded = await handleCityPress(item);
							if (loaded) addToRecentSearches(item);
							setSearchValue('');
					}}
				/>
			)}
		</>
	);
};
