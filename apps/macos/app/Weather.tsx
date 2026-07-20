import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { View } from 'react-native';
import { useNavigationScreen } from './hooks/useNavigation';

export const Weather = () => {
	const { setNavigationScreen } = useNavigationScreen();

	return (
		<View className="w-full items-center">
			<StyledPressable onPress={() => setNavigationScreen('settings')} className="p-6">
				<StyledText type="title">Go to settings screen</StyledText>
			</StyledPressable>
			<WeatherIcon isDay={1} width={150} height={150} code={1003} strokeWidth={0.5} source="weatherapi" />
			<StyledText type="screentitle">NativeWeather macOS desktop app</StyledText>
		</View>
	);
};
