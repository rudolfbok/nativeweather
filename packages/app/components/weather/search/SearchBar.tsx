import { useSearchController } from 'app/hooks/useSearchController';
import { RecentSearchesList } from './RecentSearchesList';
import { SearchInput } from './SearchInput';
import { SuggestionsList } from './SuggestionsList';
import { StyledText } from 'app/components/common/StyledText';

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
		loading,
	} = useSearchController();

	// if (loading) {
	// 	return <StyledText type="title">Search bar loading omg</StyledText>;
	// }

	return (
		<>
			<SearchInput
				searchValue={searchValue}
				isFocused={isSearchBarFocused}
				onChangeText={setSearchValue}
				clearSearch={() => setSearchValue('')}
				onFocus={() => setIsSearchBarFocused(true)}
				performSearch={() => handleInputSearch(searchValue)}
				onBlur={() => {
					setTimeout(() => setIsSearchBarFocused(false), 130);
				}}
			/>
			{showRecentSearches && (
				<RecentSearchesList recentSearches={recentSearches} onSelect={(item) => handleCityPress(item)} />
			)}
			{showSuggestions && (
				<SuggestionsList
					suggestions={suggestions}
					onSelect={(item) => {
						handleCityPress(item);
						addToRecentSearches(item);
					}}
				/>
			)}
		</>
	);
};
