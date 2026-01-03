import { View } from 'react-native';
import { StyledText } from 'app/components/common/StyledText';
// import { StyledAnimatedView } from '../common/StyledAnimatedView';
import { clsx } from 'clsx';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { AirQualityValue } from './AirQualityValue';
import { useTranslate } from '@tolgee/react';

export const NO2Detail = () => {
	const { t } = useTranslate('weather');
	const NO2Values = [
		{
			name: t('airquality.value.0'),
			textcolor: 'fair',
			value: '0 - 40',
			description: t('airquality.no2.text.0'),
		},
		{
			name: t('airquality.value.1'),
			textcolor: 'moderate',
			value: '40 - 80',
			description: t('airquality.no2.text.1'),
		},
		{
			name: t('airquality.value.2'),
			textcolor: 'sensitive',
			value: '80 - 150',
			description: t('airquality.no2.text.2'),
		},
		{
			name: t('airquality.value.3'),
			textcolor: 'unhealthy',
			value: '150 - 250',
			description: t('airquality.no2.text.3'),
		},
		{
			name: t('airquality.value.4'),
			textcolor: 'veryunhealthy',
			value: '250 - 400',
			description: t('airquality.no2.text.4'),
		},
		{
			name: t('airquality.value.5'),
			textcolor: 'hazardous',
			value: '400+',
			description: t('airquality.no2.text.5'),
		},
	];
	return (
		<View className={clsx('gap-2')}>
			<RoundView className={clsx('p-4')}>
				<StyledText type="body">{t('airquality.no2.main')}</StyledText>
			</RoundView>
			<StyledText type="subtitle">{t('airquality.pollutant.values')}</StyledText>
			<RoundView className={clsx('gap-4 p-4')}>
				{NO2Values.map(({ name, textcolor, value, description }, index) => (
					<View key={index} className={clsx('gap-4')}>
						<AirQualityValue name={name} textcolor={textcolor} value={value + ' µg/m³'} description={description} />
						{index < NO2Values.length - 1 && <Separator />}
					</View>
				))}
			</RoundView>
		</View>
	);
};
