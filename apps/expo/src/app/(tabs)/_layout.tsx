import { useTranslate } from '@tolgee/react';
import { NativeTabs } from 'expo-router/native-tabs';
import { useCSSVariable } from 'uniwind';

export default function TabsLayout() {
	const { t } = useTranslate('common');
	const [label, primary] = useCSSVariable(['--color-label', '--color-primary-blue']) as string[];

	return (
		<NativeTabs labelStyle={{ selected: { color: label } }}>
			<NativeTabs.Trigger name="(home)">
				<NativeTabs.Trigger.Label>{t('tab.home')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" selectedColor={primary} />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="search">
				<NativeTabs.Trigger.Label>{t('tab.search')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" selectedColor={primary} />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="settings">
				<NativeTabs.Trigger.Label>{t('tab.settings')}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon
					sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
					md="settings"
					selectedColor={primary}
				/>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
