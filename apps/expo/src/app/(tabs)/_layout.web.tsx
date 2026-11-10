import { useAppVersion } from '@/core';
import { DesktopShell, DesktopSidebar, HeaderSearch, SettingsList, Text, WebShell } from '@/ui';
import { isTauri } from '@tauri-apps/api/core';
import { useTranslate } from '@tolgee/react';
import { router, Slot } from 'expo-router';
import { openAbout, openFeedback, openSettingOption } from '@/settingsNavigation';

// The Tauri window gets a sidebar; the browser gets a header with search and a settings drawer.
export default function TabsLayout() {
	const { t } = useTranslate('settings');
	const version = useAppVersion();

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
						version={version}
						onOpenOption={openSettingOption}
						onOpenAbout={openAbout}
						onOpenFeedback={openFeedback}
					/>
				</>
			}
		>
			<Slot />
		</WebShell>
	);
}
