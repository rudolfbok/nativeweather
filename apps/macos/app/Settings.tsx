import { SettingsFeature } from 'app/features/settings/screen';
import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { useNavigationScreen } from 'app/hooks/useNavigation.macos';

export const Settings = () => {
	const { setNavigationScreen } = useNavigationScreen();

	return (
		<ScreenWrapper>
			<StyledPressable onPress={() => setNavigationScreen('weather')} className="rounded-3xl p-4">
				<StyledText type="title">Go back to weather</StyledText>
			</StyledPressable>
			<SettingsFeature />
		</ScreenWrapper>
	);
};
