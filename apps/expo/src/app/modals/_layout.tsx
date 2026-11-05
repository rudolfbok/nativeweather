import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ModalsLayout() {
	// ModalScreen renders its own header and background; transparent content lets the web overlay show the page behind.
	return (
		<Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
			{/* On web a metric opened from the forecast modal draws over it, so the forecast must stay rendered. */}
			<Stack.Screen name="[metric]" options={{ presentation: Platform.OS === 'web' ? 'transparentModal' : 'card' }} />
		</Stack>
	);
}
