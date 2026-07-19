import { StyledText } from 'app/components/common/styled/StyledText';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { Text, View, useColorScheme } from 'react-native';
import './globals.css';

const FeaturePill = ({ name, color }: { name: string; color: string }) => {
	return (
		<View className="rounded-3xl border border-[#909090] px-4 py-2 dark:border-[#2A2C32]">
			<Text style={{ color }}>{name}</Text>
		</View>
	);
};

export default function App() {
	const currentTheme = useColorScheme();

	const switchColor = (lightColor: string, darkColor: string): string => {
		const color = currentTheme === 'light' ? lightColor : darkColor;
		return color;
	};

	return (
		<View className="flex-1 items-center justify-center bg-[#F2F2F7] dark:bg-[#0D1119]">
			<View className="items-center rounded-3xl bg-white p-10 dark:bg-[#161A21]">
				<WeatherIcon isDay={1} width={150} height={150} code={1003} strokeWidth={0.5} source="weatherapi" />
				<StyledText type="screentitle">NativeWeather macOS desktop app</StyledText>
			</View>
		</View>
	);
}
