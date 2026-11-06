import { Stack } from 'expo-router';

export default function HomeLayout() {
	return (
		<Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			{/* White from the first frame, over the sky-coloured header. */}
			<Stack.Screen name="[city]" options={{ headerTintColor: 'white' }} />
		</Stack>
	);
}
