import { useTranslate } from '@tolgee/react';
import { Stack } from 'expo-router';
import { useCSSVariable } from 'uniwind';

export default function SettingsLayout() {
	const { t } = useTranslate('settings');
	const [background, text] = useCSSVariable(['--color-screen-background', '--color-label']) as string[];

	return (
		<Stack
			unstable_nativeProps={{ nativeContainerStyle: { backgroundColor: background } }}
			screenOptions={{
				headerTransparent: true,
				headerTintColor: text,
				headerBackButtonDisplayMode: 'minimal',
				contentStyle: { backgroundColor: background },
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerLargeTitleEnabled: true,
					headerTitle: t('settings'),
					headerStyle: { backgroundColor: 'transparent' },
				}}
			/>
			<Stack.Screen name="about" options={{ headerTitle: t('about.title') }} />
			<Stack.Screen name="feedback" options={{ title: t('feedback.title') }} />
		</Stack>
	);
}
