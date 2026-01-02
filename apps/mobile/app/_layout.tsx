import { Stack } from 'expo-router';
import '../global.css';
import React from 'react';
import { View } from 'react-native';
import { clsx } from 'clsx';
import { TolgeeProvider } from 'app/provider/TolgeeProvider';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

export default function RootLayout() {
	return (
		<TolgeeProvider>
			<View className={clsx('absolute inset-0')}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</View>
		</TolgeeProvider>
	);
}
