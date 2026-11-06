import { DesktopShell, isCompassSupported, SettingsList, Text } from '@nativeweather/ui';
import { isTauri } from '@tauri-apps/api/core';
import { useTranslate } from '@tolgee/react';
import Constants from 'expo-constants';
import { router, Slot } from 'expo-router';
import { DesktopSidebar } from '@/components/DesktopSidebar';
import { HeaderSearch } from '@/components/HeaderSearch';
import { WebShell } from '@/components/WebShell';
import { openAbout, openCompass, openFeedback, openSettingOption } from '@/settingsNavigation';

// The Tauri window gets a sidebar; the browser gets a header with search and a settings drawer.
export default function TabsLayout() {
	const { t } = useTranslate('settings');

	if (isTauri()) {
		return (
			<DesktopShell
				sidebar={<DesktopSidebar />}
				onOpenHome={() => router.navigate('/')}
				onOpenSearch={() => router.navigate('/search')}
				onOpenSettings={() => router.navigate('/settings')}
			>
				<Slot />
			</DesktopShell>
		);
	}

	return (
		<WebShell
			search={<HeaderSearch />}
			onOpenHome={() => router.navigate('/')}
			drawer={
				<>
					<Text type="screentitle" className="mb-3">
						{t('settings')}
					</Text>
					<SettingsList
						version={Constants.expoConfig?.version}
						onOpenOption={openSettingOption}
						onOpenAbout={openAbout}
						onOpenFeedback={openFeedback}
						onOpenCompass={isCompassSupported() ? openCompass : undefined}
					/>
				</>
			}
		>
			<Slot />
		</WebShell>
	);
}
