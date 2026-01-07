import { useTranslate } from '@tolgee/react';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledText } from 'app/components/common/StyledText';
import { ValuesList } from 'app/components/common/ValuesList';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const NO2Detail = () => {
	const { t } = useTranslate('weather');
	const NO2Values = [
		{
			name: t('airquality.value.0'),
			textColor: '!text-fair',
			value: '0 - 40',
			description: t('airquality.no2.text.0'),
		},
		{
			name: t('airquality.value.1'),
			textColor: '!text-moderate',
			value: '40 - 80',
			description: t('airquality.no2.text.1'),
		},
		{
			name: t('airquality.value.2'),
			textColor: '!text-sensitive',
			value: '80 - 150',
			description: t('airquality.no2.text.2'),
		},
		{
			name: t('airquality.value.3'),
			textColor: '!text-unhealthy',
			value: '150 - 250',
			description: t('airquality.no2.text.3'),
		},
		{
			name: t('airquality.value.4'),
			textColor: '!text-veryunhealthy',
			value: '250 - 400',
			description: t('airquality.no2.text.4'),
		},
		{
			name: t('airquality.value.5'),
			textColor: '!text-hazardous',
			value: '400+',
			description: t('airquality.no2.text.5'),
		},
	];
	return (
		<View className={clsx('gap-2')}>
			<View className={clsx('gap-2')}>
				<ContentRow title={t('airquality.no2.about')}>
					<StyledText type="body">{t('airquality.no2.main')}</StyledText>
				</ContentRow>
				<ContentRow title={t('airquality.pollutant.values')}>
					<ValuesList values={NO2Values} />
				</ContentRow>
			</View>
		</View>
	);
};
