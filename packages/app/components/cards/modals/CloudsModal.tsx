import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/ui/ContentRow';
import { ValuesList } from 'app/components/common/ui/ValuesList';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const CloudsModal = () => {
	const { t } = useTranslate('weather');

	const cloudCoverValues = [
		{
			name: t('description.cloudcover.0'),
			value: '0 - 12%',
		},
		{
			name: t('description.cloudcover.1'),
			value: '12 - 50%',
		},
		{
			name: t('description.cloudcover.2'),
			value: '50 - 75%',
		},
		{
			name: t('description.cloudcover.3'),
			value: '75 - 10%',
		},
	];

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('cloudcover.percentage.title')}>
				<StyledText type="body">{t('cloudcover.percentage.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('cloudcover.percentage.values')}>
				<ValuesList values={cloudCoverValues} />
			</ContentRow>
		</View>
	);
};
