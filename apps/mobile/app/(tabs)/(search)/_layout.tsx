import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
	return (
		<Stack
			screenOptions={{
				headerTintColor: useSwitchColors('black', 'white'),
				contentStyle: {
					backgroundColor: useSwitchColors('#F2F2F7', '#000'),
					paddingTop: Platform.OS === 'android' ? 60 : 0,
				},
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
