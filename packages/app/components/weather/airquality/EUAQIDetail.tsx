import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { clsx } from 'clsx';
import { Linking, Pressable, View } from 'react-native';
import { StyledText } from 'app/components/common/StyledText';
import { AirQualityValue } from './AirQualityValue';

export const EUAQIDetail = () => {
	const { t } = useTranslate('weather');
	const EUAQIValues = [
		{
			name: t('airquality.euaqi.value.0'),
			textcolor: 'good',
			value: '0 - 20',
			description: t('airquality.euaqi.text.0'),
		},
		{
			name: t('airquality.euaqi.value.1'),
			textcolor: 'fair',
			value: '20 - 40',
			description: t('airquality.euaqi.text.1'),
		},
		{
			name: t('airquality.euaqi.value.2'),
			textcolor: 'moderate',
			value: '40 - 60',
			description: t('airquality.euaqi.text.2'),
		},
		{
			name: t('airquality.euaqi.value.3'),
			textcolor: 'sensitive',
			value: '60 - 80',
			description: t('airquality.euaqi.text.3'),
		},
		{
			name: t('airquality.euaqi.value.4'),
			textcolor: 'unhealthy',
			value: '80 - 100',
			description: t('airquality.euaqi.text.4'),
		},
		{
			name: t('airquality.euaqi.value.5'),
			textcolor: 'veryunhealthy',
			value: '100+',
			description: t('airquality.euaqi.text.5'),
		},
	];
	return (
		<View className={clsx('gap-4')}>
			<StyledText type="body">{t('airquality.euaqi.main')}</StyledText>
			<Pressable onPress={() => Linking.openURL('https://airindex.eea.europa.eu/AQI/')}>
				<StyledText type="link">https://airindex.eea.europa.eu/AQI/</StyledText>
			</Pressable>
			<RoundView className={clsx('gap-4 p-4')}>
				{EUAQIValues.map(({ name, textcolor, value, description }, index) => (
					<View key={index} className={clsx('gap-4')}>
						<AirQualityValue name={name} textcolor={textcolor} value={value} description={description} />
						{index < EUAQIValues.length - 1 && <Separator />}
					</View>
				))}
			</RoundView>
		</View>
	);
};
