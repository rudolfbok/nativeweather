import { useTranslate } from '@tolgee/react';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
	const { t } = useTranslate('common');

	return (
		<NativeTabs>
			<NativeTabs.Trigger name="(home)">
				<NativeTabs.Trigger.Label>{t('tab.home')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf="house" md="home" selectedColor="#007AFF" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(weather)">
				<NativeTabs.Trigger.Label>{t('tab.weather')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf="sun.max" md="sunny" selectedColor="#007AFF" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(maps)">
				<NativeTabs.Trigger.Label>{t('tab.maps')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf="map" md="map" selectedColor="#007AFF" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(settings)">
				<NativeTabs.Trigger.Label>{t('tab.settings')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf="gear" md="settings" selectedColor="#007AFF" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(search)" role="search">
				<NativeTabs.Trigger.Label>{t('tab.search')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" selectedColor="#007AFF" />
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
