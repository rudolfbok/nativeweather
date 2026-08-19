import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/layout/ContentRow';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const SunsetModal = () => {
	const { t } = useTranslate('weather');

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('modal.description')}>
				<StyledText type="body">{t('sunset.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('sunset.twilight.title')}>
				<StyledText type="body">{t('sunset.twilight.text')}</StyledText>
			</ContentRow>
		</View>
	);
};
