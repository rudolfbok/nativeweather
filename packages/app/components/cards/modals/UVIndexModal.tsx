import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/ui/ContentRow';
import { ValuesList } from 'app/components/common/ui/ValuesList';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const UVIndexModal = () => {
	const { t } = useTranslate('weather');

	const uvIndexValues = [
		{
			name: t('description.uvindex.0'),
			textColor: '!text-[#009900]',
			value: '0 - 2',
			description: t('uvindex.text.0'),
		},
		{
			name: t('description.uvindex.1'),
			textColor: '!text-[#FFC100]',
			value: '3 - 5',
			description: t('uvindex.text.1'),
		},
		{
			name: t('description.uvindex.2'),
			textColor: '!text-[#FF6F00]',
			value: '6 - 7',
			description: t('uvindex.text.2'),
		},
		{
			name: t('description.uvindex.3'),
			textColor: '!text-[#FF0000]',
			value: '8 - 10',
			description: t('uvindex.text.3'),
		},
		{
			name: t('description.uvindex.4'),
			textColor: '!text-[#990099]',
			value: '11+',
			description: t('uvindex.text.4'),
		},
	];

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('uvindex.radiation.title')}>
				<StyledText type="body">{t('uvindex.radiation.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('uvindex.index.title')}>
				<StyledText type="body">{t('uvindex.index.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('uvindex.index.values')}>
				<ValuesList values={uvIndexValues} />
			</ContentRow>
		</View>
	);
};
