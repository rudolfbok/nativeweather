import { useTranslate } from '@tolgee/react';
import { ContentRow } from 'app/components/common/ui/ContentRow';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ValuesList } from 'app/components/common/ui/ValuesList';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const PM10Detail = () => {
	const { t } = useTranslate('weather');
	const PM10Values = [
		{
			name: t('airquality.value.0'),
			textColor: '!text-fair',
			value: '0 - 30',
			description: t('airquality.pm10.text.0'),
		},
		{
			name: t('airquality.value.1'),
			textColor: '!text-moderate',
			value: '30 - 50',
			description: t('airquality.pm10.text.1'),
		},
		{
			name: t('airquality.value.2'),
			textColor: '!text-sensitive',
			value: '50 - 80',
			description: t('airquality.pm10.text.2'),
		},
		{
			name: t('airquality.value.3'),
			textColor: '!text-unhealthy',
			value: '80 - 120',
			description: t('airquality.pm10.text.3'),
		},
		{
			name: t('airquality.value.4'),
			textColor: '!text-veryunhealthy',
			value: '120 - 200',
			description: t('airquality.pm10.text.4'),
		},
		{
			name: t('airquality.value.5'),
			textColor: '!text-hazardous',
			value: '200+',
			description: t('airquality.pm10.text.5'),
		},
	];
	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('modal.description')}>
				<StyledText type="body">{t('airquality.pm10.main')}</StyledText>
			</ContentRow>
			<ContentRow title={t('airquality.pollutant.values')}>
				<ValuesList values={PM10Values} />
			</ContentRow>
		</View>
	);
};
