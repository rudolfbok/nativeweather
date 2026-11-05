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
				{/* TEMP(phase-5): modal presentation check, removed with modal-check.tsx. */}
				<Stack.Screen
					name="modal-check"
					options={{ presentation: Platform.OS === 'web' ? 'transparentModal' : 'modal' }}
				/>
			</Stack>
		</AppProviders>
	);
}
