'use client';

import { SettingsFeature } from 'app/features/settings/screen';
import Animated from 'react-native-reanimated';

export default function SettingsScreen() {
	return (
		<Animated.ScrollView>
			<SettingsFeature />
		</Animated.ScrollView>
	);
}
