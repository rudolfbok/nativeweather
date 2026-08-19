'use client';

import { ScreenWrapper } from 'app/components/layout/ScreenWrapper';
import { SettingsFeature } from 'app/features/settings/screen';

export default function SettingsScreen() {
	return (
		<ScreenWrapper>
			<SettingsFeature />
		</ScreenWrapper>
	);
}
