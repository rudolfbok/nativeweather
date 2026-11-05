import '@/global.css';

import { Stack } from 'expo-router';
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
			</Stack>
		</AppProviders>
	);
}
