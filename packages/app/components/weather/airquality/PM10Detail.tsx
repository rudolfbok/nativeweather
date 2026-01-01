import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { StyledText } from 'app/components/common/StyledText';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { AirQualityValue } from './AirQualityValue';

export const PM10Detail = () => {
	const { t } = useTranslate('weather');
	const PM10Values = [
		{
			name: t('airquality.value.0'),
			textcolor: 'fair',
			value: '0 - 30',
			description: t('airquality.pm10.text.0'),
		},
		{
			name: t('airquality.value.1'),
			textcolor: 'moderate',
			value: '30 - 50',
			description: t('airquality.pm10.text.1'),
		},
		{
			name: t('airquality.value.2'),
			textcolor: 'sensitive',
			value: '50 - 80',
			description: t('airquality.pm10.text.2'),
		},
		{
			name: t('airquality.value.3'),
			textcolor: 'unhealthy',
			value: '80 - 120',
			description: t('airquality.pm10.text.3'),
		},
		{
			name: t('airquality.value.4'),
			textcolor: 'veryunhealthy',
			value: '120 - 200',
			description: t('airquality.pm10.text.4'),
		},
		{
			name: t('airquality.value.5'),
			textcolor: 'hazardous',
			value: '200+',
			description: t('airquality.pm10.text.5'),
		},
	];
	return (
		<View className={clsx('gap-4')}>
			<StyledText type="body">{t('airquality.pm10.main')}</StyledText>
			<RoundView className={clsx('gap-4 p-4')}>
				{PM10Values.map(({ name, textcolor, value, description }, index) => (
					<View key={index} className={clsx('gap-4')}>
						<AirQualityValue name={name} textcolor={textcolor} value={value} description={description} />
						{index < PM10Values.length - 1 && <Separator />}
					</View>
				))}
			</RoundView>
		</View>
	);
};
