import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useSearchController } from 'app/hooks/useSearchController';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useTranslate } from '@tolgee/react';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { searchValue } = useSearchController();
	const backgroundColor = useSwitchColors('#F2F2F7', '#000');

	useEffect(() => console.log(searchValue), [searchValue]);

	return (
		<Stack nativeContainerStyle={{ backgroundColor }}>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: t('search.title'),
					headerTintColor: useSwitchColors('black', 'white'),
					headerTransparent: true,
					headerShown: true,
					headerLargeTitle: true,
					headerShadowVisible: true,
					contentStyle: {
						backgroundColor,
					},
				}}
			/>
		</Stack>
	);
}
