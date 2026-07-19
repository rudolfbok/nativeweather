import { StyledText } from 'app/components/common/styled/StyledText';
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
			<View className="items-center gap-4 rounded-3xl bg-white p-10 dark:bg-[#161A21]">
				<Text className="text-5xl font-bold">React Native macOS</Text>
				<StyledText type="title">StyledText imported from packages/app</StyledText>
				<View className="flex-row gap-2">
					<FeaturePill name="React Native macOS" color={switchColor('black', 'white')} />
					<FeaturePill name="Nativewind" color="#05900A" />
					<FeaturePill name="TypeScript" color="#0079FF" />
					<FeaturePill name="PNPM" color="#EB9331" />
				</View>
				<View>
					<Text>Edit App.tsx to start building your app</Text>
				</View>
			</View>
		</View>
	);
}
