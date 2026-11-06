import { ScreenWrapper, SettingsList } from '@nativeweather/ui';
import Constants from 'expo-constants';
import { router } from 'expo-router';

export default function SettingsScreen() {
	return (
		<ScreenWrapper>
			<SettingsList
				version={Constants.expoConfig?.version}
				onOpenOption={(option) => router.push({ pathname: '/settings/[option]', params: { option } })}
				onOpenAbout={() => router.push('/settings/about')}
				onOpenFeedback={() => router.push('/settings/feedback')}
			/>
		</ScreenWrapper>
	);
}
