import { useTranslate } from '@tolgee/react';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { Tabs } from 'expo-router';
import { Cog, House, Search, Sun } from 'lucide-react-native';
import React from 'react';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { background, border, text } = useThemeColors();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: background, height: 90, paddingTop: 5, borderTopColor: border },
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					tabBarIcon: () => <House color={text} />,
					tabBarLabel: t('tab.home'),
				}}
			/>
			<Tabs.Screen
				name="(weather)"
				options={{
					tabBarIcon: () => <Sun color={text} />,
					tabBarLabel: t('tab.weather'),
				}}
			/>
			<Tabs.Screen
				name="(settings)"
				options={{
					tabBarIcon: () => <Cog color={text} />,
					tabBarLabel: t('tab.settings'),
				}}
			/>
			<Tabs.Screen
				name="(search)"
				options={{
					tabBarIcon: () => <Search color={text} />,
					tabBarLabel: t('tab.search'),
				}}
			/>
		</Tabs>
	);
}
