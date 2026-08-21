import { StyledText } from 'app/components/common/styled/StyledText';
import { SettingsFeature } from 'app/features/settings/screen';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { Pressable, View } from 'react-native';

export const Settings = () => {
	const { setNavigationScreen } = useNavigationScreen();

	return (
		<View className="w-full flex-1">
			<View className="p-4">
				{/* <ChevronLeft color="#007AFF" /> */}
				<StyledText type="body" className="!text-3xl font-semibold">
					Settings
				</StyledText>
			</View>
			<View className="px-4">
				<SettingsFeature />
			</View>
		</View>
	);
};
