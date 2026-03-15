'use client';

import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { clsx } from 'clsx';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initStorageDefaults } from 'app/storage/initStorageDefaults';
import '../global.css';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

export default function RootLayout() {
	useEffect(() => {
		initStorageDefaults();
	}, []);

	return (
		<TolgeeProvider>
			<GestureHandlerRootView>
				<View className={clsx('absolute inset-0')}>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="modals" options={{ headerShown: false, presentation: 'modal' }} />
					</Stack>
				</View>
			</GestureHandlerRootView>
		</TolgeeProvider>
	);
}
