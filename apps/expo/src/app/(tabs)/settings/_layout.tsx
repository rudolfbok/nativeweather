import { useTranslate } from '@tolgee/react';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
	const { t } = useTranslate('settings');

	return (
		<Stack screenOptions={{ headerTransparent: true, headerBackButtonDisplayMode: 'minimal' }}>
			<Stack.Screen name="index" options={{ title: t('settings'), headerLargeTitleEnabled: true }} />
			<Stack.Screen name="about" options={{ title: t('about.title') }} />
		</Stack>
	);
}
