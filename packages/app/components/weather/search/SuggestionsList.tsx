import type { City } from 'app/types/city';
import { clsx } from 'clsx';
import { Platform, View } from 'react-native';
import { SearchResult } from './SearchResult';

interface SuggestionsListProps {
	suggestions: City[];
	onSelect: (item: City) => void;
}

export const SuggestionsList = ({ suggestions, onSelect }: SuggestionsListProps) => {
	const visibleSuggestions = Platform.OS === 'macos' ? suggestions.slice(0, 5) : suggestions;

	return (
		<View
			className={clsx(
				'web:px-6 w-full items-center',
				'macos:absolute macos:left-0 macos:right-0 macos:top-16 macos:z-50'
			)}
		>
			<View
				className={clsx(
					'ios:bg-systemBackground bg-secondarySystemBackground web:mt-3 dark:bg-secondarySystemBackground_dark web:absolute w-full overflow-hidden rounded-3xl shadow-md dark:shadow-white/10'
				)}
			>
				{visibleSuggestions.map((item, index) => (
					<SearchResult
						key={index}
						index={index}
						onPress={() => onSelect(item)}
						city={item.name}
						region={item.region}
						country={item.country}
						isLast={index !== visibleSuggestions.length - 1}
					/>
				))}
			</View>
		</View>
	);
};
