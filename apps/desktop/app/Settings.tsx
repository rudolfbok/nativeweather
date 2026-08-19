import { SettingsFeature } from 'app/features/settings/screen';
import { ScreenWrapper } from 'app/components/common/layout/ScreenWrapper';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { Pressable, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

export const Settings = () => {
	const { setNavigationScreen } = useNavigationScreen();

	return (
		<View>
			<Pressable onPress={() => setNavigationScreen('weather')} className="flex-row items-center gap-2 rounded-3xl p-4">
				{/* <ChevronLeft color="#007AFF" /> */}
				<StyledText type="screentitle">Settings</StyledText>
			</Pressable>
			<ScreenWrapper>
				<SettingsFeature />
			</ScreenWrapper>
		</View>
	);
};
