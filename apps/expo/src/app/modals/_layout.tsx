import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ModalsLayout() {
	// The modal screen draws its own background (and, off iOS, its own header). On web every modal draws over the page (and over the modal
	// underneath, when stacked), so the screens below must stay rendered behind a transparent one.
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: 'transparent' },
				presentation: Platform.OS === 'web' ? 'transparentModal' : 'card',
			}}
		/>
	);
}
