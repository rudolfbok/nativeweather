import { useTranslate } from '@tolgee/react';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
	const { t } = useTranslate('common');

	return (
		<NativeTabs>
			<NativeTabs.Trigger name="(home)">
				<Label>{t('tab.home')}</Label>
				<Icon sf="house" androidSrc={require('../../assets/images/house.svg')} selectedColor="#007AFF" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(weather)">
				<Label>{t('tab.weather')}</Label>
				<Icon sf="sun.max" androidSrc={require('../../assets/images/weather.svg')} selectedColor="#007AFF" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(settings)">
				<Label>{t('tab.settings')}</Label>
				<Icon sf="gear" androidSrc={require('../../assets/images/settings.svg')} selectedColor="#007AFF" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(search)" role="search">
				<Label>{t('tab.search')}</Label>
				<Icon sf="magnifyingglass" androidSrc={require('../../assets/images/search.svg')} selectedColor="#007AFF" />
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
