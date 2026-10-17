import type { City } from '@nativeweather/types/city';
import { clsx } from 'clsx';
import { Platform, View } from 'react-native';
import { SearchResult } from './SearchResult';
import { border } from '@nativeweather/ui/constants/border';

interface RecentSearchesProps {
	recentSearches: City[];
	onSelect: (item: City) => void;
}

const recentSearchesCount = Platform.OS === 'web' || Platform.OS === 'macos' ? 5 : 10;

export const RecentSearches = ({ recentSearches, onSelect }: RecentSearchesProps) => {
	return (
		<View className={clsx('macos:mt-4 w-full items-center web:px-6')}>
			<View
				className={clsx(
					'ios:bg-systemBackground w-full overflow-hidden rounded-3xl bg-secondarySystemBackground web:absolute web:mt-3 dark:bg-secondarySystemBackground_dark',
					border
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
