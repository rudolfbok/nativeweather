import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { Stack } from 'expo-router';

export default function MapsLayout() {
	const { background } = useThemeColors();

	return (
		<Stack nativeContainerStyle={{ backgroundColor: background }}>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
					// title: 'Maps',
					// headerTitle: 'Maps',
				}}
			/>
		</Stack>
	);
}
