import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Cog, House, Search, Sun } from 'lucide-react-native';
import { useTranslate } from '@tolgee/react';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const tabBarColor = useSwitchColors('#F2F2F7', '#000');
	const iconColor = useSwitchColors('black', 'white');
	const tabBarBorderColor = useSwitchColors('#E5E5E8', '#2F2F32');

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: tabBarColor, height: 90, paddingTop: 5, borderTopColor: tabBarBorderColor },
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					tabBarIcon: () => <House color={iconColor} />,
					tabBarLabel: t('tab.home'),
				}}
			/>
			<Tabs.Screen
				name="(weather)"
				options={{
					tabBarIcon: () => <Sun color={iconColor} />,
					tabBarLabel: t('tab.weather'),
				}}
			/>
			<Tabs.Screen
				name="(settings)"
				options={{
					tabBarIcon: () => <Cog color={iconColor} />,
					tabBarLabel: t('tab.settings'),
				}}
			/>
			<Tabs.Screen
				name="(search)"
				options={{
					tabBarIcon: () => <Search color={iconColor} />,
					tabBarLabel: t('tab.search'),
				}}
			/>
		</Tabs>
	);
}
