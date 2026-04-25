'use client';

import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';
import { SettingsFeature } from 'app/features/settings/screen';

export default function SettingsScreen() {
	return (
		<ScreenWrapper>
			<SettingsFeature />
		</ScreenWrapper>
	);
}
