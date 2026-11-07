import { Stack } from 'expo-router';

export default function HomeLayout() {
	return (
		<Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			{/* White from the first frame, over the sky-coloured header. One city screen for every city: opening another
			    one replaces it, so back always leads home instead of through the cities seen before. */}
			<Stack.Screen name="[city]" options={{ headerTintColor: 'white' }} dangerouslySingular={() => 'city'} />
		</Stack>
	);
}
