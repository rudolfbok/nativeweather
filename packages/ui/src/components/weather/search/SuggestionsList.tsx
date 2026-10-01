import { border } from '@nativeweather/core/constants/border';
import type { City } from '@nativeweather/types/city';
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
		<View className={clsx('web:px-6 macos:mt-4 w-full items-center')}>
			<View
				className={clsx(
					'ios:bg-systemBackground bg-secondarySystemBackground web:mt-3 dark:bg-secondarySystemBackground_dark web:absolute w-full overflow-hidden rounded-3xl',
					border
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
