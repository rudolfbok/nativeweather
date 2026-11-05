import { useTranslate } from '@tolgee/react';
import { Stack } from 'expo-router';

export default function SearchLayout() {
	const { t } = useTranslate('common');

	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: t('search.title'), headerTransparent: true }} />
		</Stack>
	);
}
