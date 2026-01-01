import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { StyledText } from 'app/components/common/StyledText';
import { clsx } from 'clsx';
import { Linking, Pressable, View } from 'react-native';
import { AirQualityValue } from './AirQualityValue';

export const USAQIDetail = () => {
	const { t } = useTranslate('weather');
	const USAQIValues = [
		{
			name: t('airquality.usaqi.value.0'),
			textcolor: 'fair',
			value: '0 - 50',
			description: t('airquality.usaqi.text.0'),
		},
		{
			name: t('airquality.usaqi.value.1'),
			textcolor: 'moderate',
			value: '50 - 100',
			description: t('airquality.usaqi.text.1'),
		},
		{
			name: t('airquality.usaqi.value.2'),
			textcolor: 'sensitive',
			value: '100 - 150',
			description: t('airquality.usaqi.text.2'),
		},
		{
			name: t('airquality.usaqi.value.3'),
			textcolor: 'unhealthy',
			value: '150 - 200',
			description: t('airquality.usaqi.text.3'),
		},
		{
			name: t('airquality.usaqi.value.4'),
			textcolor: 'veryunhealthy',
			value: '200 - 300',
			description: t('airquality.usaqi.text.4'),
		},
		{
			name: t('airquality.usaqi.value.5'),
			textcolor: 'hazardous',
			value: '300 - 500',
			description: t('airquality.usaqi.text.5'),
		},
	];
	return (
		<View className={clsx('gap-4')}>
			<StyledText type="body">{t('airquality.usaqi.main')}</StyledText>
			<Pressable onPress={() => Linking.openURL('https://www.airnow.gov/')}>
				<StyledText type="link">https://www.airnow.gov/</StyledText>
			</Pressable>
			<RoundView className={clsx('gap-4 p-4')}>
				{USAQIValues.map(({ name, textcolor, value, description }, index) => (
					<View key={index} className={clsx('gap-4')}>
						<AirQualityValue name={name} textcolor={textcolor} value={value} description={description} />
						{index < USAQIValues.length - 1 && <Separator />}
					</View>
				))}
			</RoundView>
		</View>
	);
};
