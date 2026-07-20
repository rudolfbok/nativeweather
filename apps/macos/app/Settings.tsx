import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { View } from 'react-native';
import { useNavigationScreen } from './hooks/useNavigation';

export const Settings = () => {
	const { setNavigationScreen } = useNavigationScreen();

	return (
		<View className="w-full items-center">
			<StyledPressable onPress={() => setNavigationScreen('weather')} className="p-6">
				<StyledText type="title">Go back to weather</StyledText>
			</StyledPressable>
		</View>
	);
};
