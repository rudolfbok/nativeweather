import clsx from 'clsx';
import { View } from 'react-native';
import { SearchResult } from './SearchResult';
import { City } from 'app/storage/crudMMKVService';

interface SuggestionsListProps {
	suggestions: City[];
	onSelect: (item: City) => void;
}

export const SuggestionsList = ({ suggestions, onSelect }: SuggestionsListProps) => {
	return (
		<View className={clsx('web:px-6 w-full items-center')}>
			<View
				className={clsx(
					'ios:bg-systemBackground ios:shadow-none bg-secondarySystemBackground web:mt-3 dark:bg-secondarySystemBackground_dark absolute w-full overflow-hidden rounded-3xl shadow-md dark:shadow-white/10'
				)}
			>
				{suggestions.map((item, index) => (
					<SearchResult
						key={index}
						index={index}
						onPress={() => onSelect(item)}
						city={item.name}
						region={item.region}
						country={item.country}
						isLast={index !== suggestions.length - 1}
					/>
				))}
			</View>
		</View>
	);
};
