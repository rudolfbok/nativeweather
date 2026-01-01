import clsx from 'clsx';
import { Platform, View } from 'react-native';
import { SearchResult } from './SearchResult';
import { City } from 'app/storage/crudMMKVService';

interface RecentSearchesListProps {
	recentSearches: City[];
	onSelect: (item: City) => void;
}

const recentSearchesCount = Platform.OS === 'web' ? 5 : 10;

export const RecentSearchesList = ({ recentSearches, onSelect }: RecentSearchesListProps) => {
	return (
		<View className={clsx('web:px-6 w-full items-center')}>
			<View
				className={clsx(
					'ios:bg-systemBackground bg-secondarySystemBackground web:mt-3 dark:bg-secondarySystemBackground_dark web:absolute w-full overflow-hidden rounded-3xl shadow-md dark:shadow-white/10'
				)}
			>
				{(recentSearches || []).slice(0, recentSearchesCount).map((item, index) => (
					<SearchResult
						key={index}
						index={index}
						onPress={() => onSelect(item)}
						city={item.name}
						region={item.region}
						country={item.country}
						isLast={index !== recentSearches.length - 1}
					/>
				))}
			</View>
		</View>
	);
};
