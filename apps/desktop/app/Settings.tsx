import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { SettingsFeature } from '@nativeweather/ui/features/settings/screen';
import { View } from 'react-native';

export const Settings = () => {
	return (
		<View className="flex-1 p-4">
			<StyledText type="title" className="mb-4 mt-2 !text-3xl">
				Settings
			</StyledText>
			<SettingsFeature />
		</View>
	);
};
