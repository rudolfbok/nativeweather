import { useTranslate } from '@tolgee/react';
import { ContentRow } from '@nativeweather/ui/components/common/layout/ContentRow';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { ValuesList } from '@nativeweather/ui/components/common/modal/ValuesList';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const O3Detail = () => {
	const { t } = useTranslate('weather');
	const O3Values = [
		{
			name: t('airquality.value.0'),
			textColor: '!text-fair',
			value: '0 - 120',
			description: t('airquality.o3.text.0'),
		},
		{
			name: t('airquality.value.1'),
			textColor: '!text-moderate',
			value: '120 - 160',
			description: t('airquality.o3.text.1'),
		},
		{
			name: t('airquality.value.2'),
			textColor: '!text-sensitive',
			value: '160 - 240',
			description: t('airquality.o3.text.2'),
		},
		{
			name: t('airquality.value.3'),
			textColor: '!text-unhealthy',
			value: '240 - 320',
			description: t('airquality.o3.text.3'),
		},
		{
			name: t('airquality.value.4'),
			textColor: '!text-veryunhealthy',
			value: '320 - 440',
			description: t('airquality.o3.text.4'),
		},
		{
			name: t('airquality.value.5'),
			textColor: '!text-hazardous',
			value: '440+',
			description: t('airquality.o3.text.5'),
		},
	];
	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('modal.description')}>
				<StyledText type="body">{t('airquality.o3.main')}</StyledText>
			</ContentRow>
			<ContentRow title={t('airquality.pollutant.values')}>
				<ValuesList values={O3Values} />
			</ContentRow>
		</View>
	);
};
