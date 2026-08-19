'use client';

import { ScreenWrapper } from 'app/components/common/layout/ScreenWrapper';
import { SettingsFeature } from 'app/features/settings/screen';

export default function SettingsScreen() {
	return (
		<ScreenWrapper>
			<SettingsFeature />
		</ScreenWrapper>
	);
}
