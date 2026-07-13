import { useTranslate } from '@tolgee/react';
import { useSearchController } from 'app/hooks/useSearchController';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { searchValue } = useSearchController();
	const { background, text } = useThemeColors();

	useEffect(() => console.log(searchValue), [searchValue]);

	return (
		<Stack nativeContainerStyle={{ backgroundColor: background }}>
			<Stack.Screen
				name="index"
				options={{
					title: t('search.title'),
					headerTitle: t('search.title'),
					headerTintColor: text,
					headerTransparent: true,
					headerShown: true,
					headerLargeTitle: true,
					contentStyle: {
						backgroundColor: background,
					},
				}}
			/>
		</Stack>
	);
}
