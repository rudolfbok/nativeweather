import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/layout/ContentRow';
import { ValuesList } from 'app/components/common/modal/ValuesList';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const CloudsModal = () => {
	const { t } = useTranslate('weather');

	const cloudCoverValues = [
		{
			name: t('description.cloudcover.0'),
			textColor: 'opacity-100',
			value: '0 - 12%',
		},
		{
			name: t('description.cloudcover.1'),
			textColor: 'opacity-80',
			value: '12 - 50%',
		},
		{
			name: t('description.cloudcover.2'),
			textColor: 'opacity-60',
			value: '50 - 75%',
		},
		{
			name: t('description.cloudcover.3'),
			textColor: 'opacity-40',
			value: '75 - 100%',
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
