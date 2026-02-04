import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { clsx } from 'clsx';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

export default function RootLayout() {
	return (
		<TolgeeProvider>
			<GestureHandlerRootView>
				<View className={clsx('absolute inset-0')}>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
				</View>
			</GestureHandlerRootView>
		</TolgeeProvider>
	);
}
