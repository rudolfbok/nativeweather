import { useTranslate } from '@tolgee/react';
import { useSearchController } from 'app/hooks/useSearchController';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { searchValue } = useSearchController();
	const { backgroundColor, textColor } = useThemeColors();

	useEffect(() => console.log(searchValue), [searchValue]);

	return (
		<Stack nativeContainerStyle={{ backgroundColor }}>
			<Stack.Screen
				name="index"
				options={{
					title: t('search.title'),
					headerTitle: t('search.title'),
					headerTintColor: textColor,
					headerTransparent: true,
					headerShown: true,
					headerLargeTitle: true,
					contentStyle: {
						backgroundColor,
					},
				}}
			/>
		</Stack>
	);
}
