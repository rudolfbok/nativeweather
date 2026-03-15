import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/ui/ContentRow';
import { ValuesList } from 'app/components/common/ui/ValuesList';
import { clsx } from 'clsx';
import { GestureResponderEvent, ScrollView, View } from 'react-native';

export const HumidityModal = () => {
	const { t } = useTranslate('weather');

	const humidityScaleValues = [
		{
			name: t('description.humidity.0'),
			value: '0 - 20%',
		},
		{
			name: t('description.humidity.1'),
			value: '20 - 40%',
		},
		{
			name: t('description.humidity.2'),
			value: '40 - 60%',
		},
		{
			name: t('description.humidity.3'),
			value: '60 - 80%',
		},
		{
			name: t('description.humidity.4'),
			value: '80 - 100%',
		},
	];

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('humidity.relativehumidity.title')}>
				<StyledText type="body">{t('humidity.relativehumidity.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('humidity.relativehumidity.values')}>
				<ValuesList values={humidityScaleValues} valueColor="!text-[#3DA443]" />
			</ContentRow>
			<ContentRow title={t('humidity.dewpoint.title')}>
				<StyledText type="body">{t('humidity.dewpoint.text')}</StyledText>
			</ContentRow>
		</View>
	);
};
