import { Stack } from 'expo-router';

export default function ModalsLayout() {
	// ModalScreen renders its own header and background; transparent content lets the web overlay show the page behind.
	return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />;
}
