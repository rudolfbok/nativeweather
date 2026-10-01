import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { SearchBar } from '@nativeweather/ui/components/weather/search/SearchBar';
import { View } from 'react-native';

export const Search = () => {
	return (
		<View className="flex w-full flex-col p-4">
			<StyledText type="sectiontitle" className="mb-4">
				Search
			</StyledText>
			<SearchBar />
		</View>
	);
};
