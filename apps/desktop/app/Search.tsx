import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { SearchBar } from '@nativeweather/ui/components/weather/search/SearchBar';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const Search = () => {
	return (
		<View className={clsx('flex-1 p-4')}>
			<StyledText type="title" className="mb-4 mt-2 !text-3xl">
				Search
			</StyledText>
			<SearchBar />
		</View>
	);
};
