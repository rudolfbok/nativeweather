import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/ui/ContentRow';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const SunriseModal = () => {
	const { t } = useTranslate('weather');

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('modal.description')}>
				<StyledText type="body">{t('sunrise.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('sunrise.dawn.title')}>
				<StyledText type="body">{t('sunrise.dawn.text')}</StyledText>
			</ContentRow>
		</View>
	);
};
