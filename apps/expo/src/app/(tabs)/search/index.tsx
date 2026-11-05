// STUB(phase-6): search arrives with slice 6.8.
import { ScreenWrapper, Text } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { View } from 'react-native';

export default function SearchScreen() {
	const { t } = useTranslate('common');

	return (
		<View className="flex-1 bg-screen-background">
			<ScreenWrapper>
				<Text type="body">{t('search.searchbar')}</Text>
			</ScreenWrapper>
		</View>
	);
}
