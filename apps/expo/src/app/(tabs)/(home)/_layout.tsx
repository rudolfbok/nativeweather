import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function HomeLayout() {
	return (
		<Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			{/* White from the first frame, over the sky-coloured header. One city screen for every city: opening another
			    one replaces it, so back always leads home instead of through the cities seen before. The web page has no
			    header, hidden here rather than in the screen, which would flash the route name "[city]" until it renders. */}
			<Stack.Screen
				name="[city]"
				options={{ headerTintColor: 'white', headerShown: Platform.OS !== 'web' }}
				dangerouslySingular={() => 'city'}
			/>
		</Stack>
	);
}
