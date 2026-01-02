import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { Stack } from 'expo-router';

export default function TabLayout() {
	return (
		<Stack
			screenOptions={{
				headerTintColor: useSwitchColors('black', 'white'),
				contentStyle: {
					backgroundColor: useSwitchColors('#F2F2F7', '#000'),
					// paddingHorizontal: 16,
				},
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
