import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { View } from 'react-native';
import { useNavigationScreen } from 'app/hooks/useNavigation.macos';

export const Weather = () => {
	const { setNavigationScreen } = useNavigationScreen();

	return (
		<View className="w-full items-center">
			<View className="gap-4">
				<StyledPressable onPress={() => setNavigationScreen('testing')} className="rounded-3xl p-4">
					<StyledText type="title">Go to testing screen</StyledText>
				</StyledPressable>
				<StyledPressable onPress={() => setNavigationScreen('settings')} className="rounded-3xl p-4">
					<StyledText type="title">Go to settings screen</StyledText>
				</StyledPressable>
			</View>
			<WeatherIcon isDay={1} width={120} height={120} code={1003} strokeWidth={0.5} source="weatherapi" />
			<StyledText type="title">NativeWeather macOS desktop app</StyledText>
		</View>
	);
};
