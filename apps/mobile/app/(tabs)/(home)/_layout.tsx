import { useThemeColors } from 'app/hooks/useThemeColors';
import { Stack } from 'expo-router';

export default function HomeLayout() {
	const { backgroundColor } = useThemeColors();

	return (
		<Stack
			nativeContainerStyle={{ backgroundColor }}
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor,
				},
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
