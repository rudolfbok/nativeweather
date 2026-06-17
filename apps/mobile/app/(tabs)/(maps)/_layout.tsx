import { useBackgroundColor } from 'app/hooks/useThemeColors';
import { Stack } from 'expo-router';

export default function MapsLayout() {
	const backgroundColor = useBackgroundColor();

	return (
		<Stack nativeContainerStyle={{ backgroundColor }}>
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
