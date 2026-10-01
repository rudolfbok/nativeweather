import { StyledText } from 'app/components/common/styled/StyledText';
import { SettingsFeature } from 'app/features/settings/screen';
import { View } from 'react-native';

export const Settings = () => {
	return (
		<View className="w-full flex-1">
			<View className="mt-2 p-4">
				<StyledText type="sectiontitle">Settings</StyledText>
			</View>
			<View className="px-4">
				<SettingsFeature />
			</View>
		</View>
	);
};
