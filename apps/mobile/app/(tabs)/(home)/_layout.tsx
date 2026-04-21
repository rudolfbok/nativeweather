import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { Stack } from 'expo-router';

export default function HomeLayout() {
	const backgroundColor = useSwitchColors('#F2F2F7', '#000');

	return (
		<Stack
			nativeContainerStyle={{ backgroundColor }}
			screenOptions={{
				headerTintColor: useSwitchColors('black', 'white'),
				contentStyle: {
					backgroundColor,
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
