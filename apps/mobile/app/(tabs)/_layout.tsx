import { useTranslate } from '@tolgee/react';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { text } = useThemeColors();

	return (
		<NativeTabs>
			<NativeTabs.Trigger name="(home)">
				<NativeTabs.Trigger.Label>{t('tab.home')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" selectedColor={text} />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(weather)">
				<NativeTabs.Trigger.Label>{t('tab.weather')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon
					sf={{ default: 'sun.max', selected: 'sun.max.fill' }}
					md="sunny"
					selectedColor={text}
				/>
			</NativeTabs.Trigger>
			{/* <NativeTabs.Trigger name="(maps)">
				<NativeTabs.Trigger.Label>{t('tab.maps')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf={{ default: 'map', selected: 'map.fill' }} md="map" selectedColor={text} />
			</NativeTabs.Trigger> */}
			<NativeTabs.Trigger name="(settings)">
				<NativeTabs.Trigger.Label>{t('tab.settings')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon
					sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
					md="settings"
					selectedColor={text}
				/>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="(search)" role="search">
				<NativeTabs.Trigger.Label>{t('tab.search')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon
					sf={{ default: 'magnifyingglass', selected: 'magnifyingglass.circle.fill' }}
					md="search"
					selectedColor={text}
				/>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
