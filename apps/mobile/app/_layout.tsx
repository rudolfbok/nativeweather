'use client';

import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { TolgeeProvider } from '@nativeweather/ui/provider/TolgeeProvider';
import { initStorageDefaults } from '@nativeweather/core/database/initStorageDefaults';
import { initThemeFromStorage } from '@nativeweather/core/database/initTheme';
import { Toaster } from '@nativeweather/ui/components/common/notifications/Toaster';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

export default function RootLayout() {
	const { background } = useThemeColors();
	const { colorScheme } = useColorScheme();

	useEffect(() => {
		initStorageDefaults();
		initThemeFromStorage();
	}, []);

	return (
		<TolgeeProvider>
			<GestureHandlerRootView>
				<ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
					<Stack nativeContainerStyle={{ backgroundColor: background }}>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false, contentStyle: { backgroundColor: background } }}
						/>
						<Stack.Screen name="modals" options={{ headerShown: false, presentation: 'modal' }} />
					</Stack>
				</ThemeProvider>
				<Toaster />
			</GestureHandlerRootView>
		</TolgeeProvider>
	);
}
