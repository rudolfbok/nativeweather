import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { StyledText } from 'app/components/common/StyledText';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { AirQualityValue } from './AirQualityValue';

export const O3Detail = () => {
	const { t } = useTranslate('weather');
	const O3Values = [
		{
			name: t('airquality.value.0'),
			textcolor: 'fair',
			value: '0 - 120',
			description: t('airquality.o3.text.0'),
		},
		{
			name: t('airquality.value.1'),
			textcolor: 'moderate',
			value: '120 - 160',
			description: t('airquality.o3.text.1'),
		},
		{
			name: t('airquality.value.2'),
			textcolor: 'sensitive',
			value: '160 - 240',
			description: t('airquality.o3.text.2'),
		},
		{
			name: t('airquality.value.3'),
			textcolor: 'unhealthy',
			value: '240 - 320',
			description: t('airquality.o3.text.3'),
		},
		{
			name: t('airquality.value.4'),
			textcolor: 'veryunhealthy',
			value: '320 - 440',
			description: t('airquality.o3.text.4'),
		},
		{
			name: t('airquality.value.5'),
			textcolor: 'hazardous',
			value: '440+',
			description: t('airquality.o3.text.5'),
		},
	];
	return (
		<View className={clsx('gap-2')}>
			<RoundView className={clsx('p-4')}>
				<StyledText type="body">{t('airquality.o3.main')}</StyledText>
			</RoundView>
			<StyledText type="subtitle">{t('airquality.pollutant.values')}</StyledText>
			<RoundView className={clsx('gap-4 p-4')}>
				{O3Values.map(({ name, textcolor, value, description }, index) => (
					<View key={index} className={clsx('gap-4')}>
						<AirQualityValue name={name} textcolor={textcolor} value={value} description={description} />
						{index < O3Values.length - 1 && <Separator />}
					</View>
				))}
			</RoundView>
		</View>
	);
};
