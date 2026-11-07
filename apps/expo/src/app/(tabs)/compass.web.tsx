import { Compass, ScreenWrapper, Text } from '@/ui';
import { useTranslate } from '@tolgee/react';

// Web only: native has no such route, and the settings entry hides itself where there is no magnetometer.
export default function CompassScreen() {
	const { t } = useTranslate('weather');

	return (
		<ScreenWrapper>
			<Text type="screentitle" className="mb-3">
				{t('compass.title')}
			</Text>
			<Compass />
		</ScreenWrapper>
	);
}
