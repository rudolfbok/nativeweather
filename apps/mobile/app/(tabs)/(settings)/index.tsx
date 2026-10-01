'use client';

import { ScreenWrapper } from '@nativeweather/ui/components/common/layout/ScreenWrapper';
import { SettingsFeature } from '@nativeweather/ui/features/settings/screen';

export default function SettingsScreen() {
	return (
		<ScreenWrapper>
			<SettingsFeature />
		</ScreenWrapper>
	);
}
