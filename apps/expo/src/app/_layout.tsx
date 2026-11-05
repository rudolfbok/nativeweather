import '@/global.css';

import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { AppProviders } from '@/providers/AppProviders';

export const unstable_settings = {
	// Keeps the tabs underneath when a modal or city URL is opened directly.
	anchor: '(tabs)',
};

export default function RootLayout() {
	return (
		<AppProviders>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
				{/* Web keeps the page rendered underneath; ModalScreen draws the blurred overlay. */}
				<Stack.Screen name="modals" options={{ presentation: Platform.OS === 'web' ? 'transparentModal' : 'modal' }} />
			</Stack>
		</AppProviders>
	);
}
