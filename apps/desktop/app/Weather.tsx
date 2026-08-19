import { ScreenWrapper } from 'app/components/layout/ScreenWrapper.macos';
import { WeatherFeature } from 'app/features/weather/screen.macos';
import { useWeather } from 'app/hooks/weather/useWeather';

export const Weather = () => {
	const { weatherData } = useWeather();
	const weatherKey = weatherData ? `${weatherData.location.lat}:${weatherData.location.lon}` : 'empty';

	return (
		<ScreenWrapper>
			<WeatherFeature />
			{/* <View className="gap-4">
				<StyledPressable onPress={() => setNavigationScreen('testing')} className="rounded-3xl p-4">
					<StyledText type="title">Go to testing screen</StyledText>
				</StyledPressable>
				<StyledPressable onPress={() => setNavigationScreen('settings')} className="rounded-3xl p-4">
					<StyledText type="title">Go to settings screen</StyledText>
				</StyledPressable>
			</View>
			<WeatherIcon isDay={1} width={120} height={120} code={1003} strokeWidth={0.5} source="weatherapi" />
			<StyledText type="title">NativeWeather macOS desktop app</StyledText> */}
		</ScreenWrapper>
	);
};
