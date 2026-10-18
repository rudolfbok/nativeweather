import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { Stack } from 'expo-router';

export default function HomeLayout() {
	const { background } = useThemeColors();

	return (
		<Stack
			unstable_nativeProps={{ nativeContainerStyle: { backgroundColor: background } }}
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: background,
				},
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
