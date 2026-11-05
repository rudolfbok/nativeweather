import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ModalsLayout() {
	// ModalScreen renders its own header and background. On web every modal draws over the page (and over the modal
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
