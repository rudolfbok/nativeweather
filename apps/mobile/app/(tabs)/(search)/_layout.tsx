import { useTranslate } from '@tolgee/react';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { Stack } from 'expo-router';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { background, text } = useThemeColors();

	return (
		<Stack unstable_nativeProps={{ nativeContainerStyle: { backgroundColor: background } }}>
			<Stack.Screen
				name="index"
				options={{
					title: t('search.title'),
					headerTitle: t('search.title'),
					headerTintColor: text,
					headerTransparent: true,
					headerShown: true,
					contentStyle: {
						backgroundColor: background,
					},
				}}
			/>
		</Stack>
	);
}
