// STUB(phase-6): about screen arrives with slice 6.9.
import { ContentRow, ScreenWrapper, Text } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { View } from 'react-native';

export default function AboutScreen() {
	const { t } = useTranslate('settings');

	return (
		<View className="flex-1 bg-screen-background">
			<ScreenWrapper>
				<ContentRow title={t('about.title')}>
					<Text type="body">{t('about.aboutapp')}</Text>
				</ContentRow>
			</ScreenWrapper>
		</View>
	);
}
