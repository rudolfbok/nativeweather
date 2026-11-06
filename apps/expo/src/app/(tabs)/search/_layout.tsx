import { useTranslate } from '@tolgee/react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useCSSVariable } from 'uniwind';

export default function SearchLayout() {
	const { t } = useTranslate('common');
	const [background, text] = useCSSVariable(['--color-screen-background', '--color-label']) as string[];

	return (
		<Stack unstable_nativeProps={{ nativeContainerStyle: { backgroundColor: background } }}>
			<Stack.Screen
				name="index"
				options={{
					title: t('search.title'),
					headerTitle: t('search.title'),
					headerTintColor: text,
					headerTransparent: true,
					headerShown: Platform.OS !== 'web',
					contentStyle: { backgroundColor: background },
				}}
			/>
		</Stack>
	);
}
