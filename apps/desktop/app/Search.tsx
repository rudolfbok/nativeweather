import { StyledText } from 'app/components/common/styled/StyledText';
import { SearchBar } from 'app/components/weather/search/SearchBar';
import { View } from 'react-native';

export const Settings = () => {
	return (
		<View className="flex w-full flex-col p-4">
			<StyledText type="body" className="!text-3xl font-semibold">
				Settings
			</StyledText>
			<SearchBar />
		</View>
	);
};
