'use client';

import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { initStorageDefaults } from 'app/storage/initStorageDefaults';
import { initThemeFromStorage } from 'app/storage/initTheme';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

export default function RootLayout() {
	const { background } = useThemeColors();

	useEffect(() => {
		initStorageDefaults();
		initThemeFromStorage();
	}, []);

	return (
		<TolgeeProvider>
			<GestureHandlerRootView>
				<Stack nativeContainerStyle={{ backgroundColor: background }}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: { backgroundColor: background } }} />
					<Stack.Screen name="modals" options={{ headerShown: false, presentation: 'modal' }} />
				</Stack>
			</GestureHandlerRootView>
		</TolgeeProvider>
	);
}
