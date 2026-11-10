import { desktopWidth, ScreenWrapper, SettingsList, Text } from '@/ui';
import { isTauri } from '@tauri-apps/api/core';
import { useTranslate } from '@tolgee/react';
import Constants from 'expo-constants';
import { clsx } from 'clsx';
import { Platform, View } from 'react-native';
import { openAbout, openFeedback, openSettingOption } from '@/settingsNavigation';

export default function SettingsScreen() {
	const { t } = useTranslate('settings');

	return (
		<ScreenWrapper>
			{/* Native has a large title in the navigation bar; the web has no bar. */}
			<View className={clsx(desktopWidth)}>
			{Platform.OS === 'web' && (
				<Text type="screentitle" className="mb-3">
					{t('settings')}
				</Text>
			)}
			<SettingsList
				version={Constants.expoConfig?.version}
				twoColumns={isTauri()}
				onOpenOption={openSettingOption}
				onOpenAbout={openAbout}
				onOpenFeedback={openFeedback}
			/>
			</View>
		</ScreenWrapper>
	);
}
