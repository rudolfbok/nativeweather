import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { Stack } from 'expo-router';

export default function HomeLayout() {
	return (
		<Stack
			screenOptions={{
				headerTintColor: useSwitchColors('black', 'white'),
				contentStyle: {
					backgroundColor: useSwitchColors('#F2F2F7', '#000'),
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
