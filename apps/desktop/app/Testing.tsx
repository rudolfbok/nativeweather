import { StyledText } from 'app/components/common/styled/StyledText';
import { SearchBar } from 'app/components/weather/search/SearchBar';
import { View } from 'react-native';

export const Testing = () => {
	return (
		<View className="w-full p-4">
			<StyledText type="sectiontitle" className="pb-4">
				Search
			</StyledText>
			<SearchBar />
		</View>
	);
};
