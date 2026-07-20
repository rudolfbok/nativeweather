import { StyledText } from 'app/components/common/styled/StyledText';
import { View } from 'react-native';

export const Sidebar = () => {
	return (
		<View className="bg-systemBackground dark:bg-secondarySystemBackground_dark w-80 items-center rounded-3xl p-4">
			<StyledText type="body">Example</StyledText>
		</View>
	);
};
