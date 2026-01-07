import { useTranslate } from '@tolgee/react';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledText } from 'app/components/common/StyledText';
import { ValuesList } from 'app/components/common/ValuesList';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const PM25Detail = () => {
	const { t } = useTranslate('weather');
	const PM25Values = [
		{
			name: t('airquality.value.0'),
			textColor: '!text-fair',
			value: '0 - 15',
			description: t('airquality.pm25.text.0'),
		},
		{
			name: t('airquality.value.1'),
			textColor: '!text-moderate',
			value: '15 - 25',
			description: t('airquality.pm25.text.1'),
		},
		{
			name: t('airquality.value.2'),
			textColor: '!text-sensitive',
			value: '25 - 40',
			description: t('airquality.pm25.text.2'),
		},
		{
			name: t('airquality.value.3'),
			textColor: '!text-unhealthy',
			value: '40 - 65',
			description: t('airquality.pm25.text.3'),
		},
		{
			name: t('airquality.value.4'),
			textColor: '!text-veryunhealthy',
			value: '65 - 100',
			description: t('airquality.pm25.text.4'),
		},
		{
			name: t('airquality.value.5'),
			textColor: '!text-hazardous',
			value: '100+',
			description: t('airquality.pm25.text.5'),
		},
	];
	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('airquality.o3.about')}>
				<StyledText type="body">{t('airquality.o3.main')}</StyledText>
			</ContentRow>
			<ContentRow title={t('airquality.pollutant.values')}>
				<ValuesList values={PM25Values} />
			</ContentRow>
		</View>
	);
};
