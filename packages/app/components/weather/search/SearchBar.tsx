import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { useSearchController } from 'app/hooks/search/useSearchController';
import { RecentSearches } from './RecentSearches';
import { SearchInput } from './SearchInput';
import { SuggestionsList } from './SuggestionsList';
import { clsx } from 'clsx';

export const SearchBar = () => {
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

	return (
		<>
			<SearchInput
				searchValue={searchValue}
				isFocused={isSearchBarFocused}
				onChangeText={setSearchValue}
				clearSearch={() => setSearchValue('')}
				onFocus={() => setIsSearchBarFocused(true)}
				performSearch={async () => {
					await handleInputSearch(searchValue);
				}}
				onBlur={() => {
					setTimeout(() => setIsSearchBarFocused(false), 130);
				}}
			/>
			{showRecentSearches && (
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
