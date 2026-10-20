import { useTranslate } from '@tolgee/react';
import { ContentRow } from '../common/layout/ContentRow';
import { StyledText } from '../common/styled/StyledText';
import { ValuesList } from '../common/modal/ValuesList';
import { clsx } from 'clsx';
import { Linking, Pressable, View } from 'react-native';

export const EUAQIDetail = () => {
	const { t } = useTranslate('weather');
	const EUAQIValues = [
		{
			name: t('airquality.euaqi.value.0'),
			textColor: '!text-good',
			value: '0 - 20',
			description: t('airquality.euaqi.text.0'),
		},
		{
			name: t('airquality.euaqi.value.1'),
			textColor: '!text-fair',
			value: '20 - 40',
			description: t('airquality.euaqi.text.1'),
		},
		{
			name: t('airquality.euaqi.value.2'),
			textColor: '!text-moderate',
			value: '40 - 60',
			description: t('airquality.euaqi.text.2'),
		},
		{
			name: t('airquality.euaqi.value.3'),
			textColor: '!text-sensitive',
			value: '60 - 80',
			description: t('airquality.euaqi.text.3'),
		},
		{
			name: t('airquality.euaqi.value.4'),
			textColor: '!text-unhealthy',
			value: '80 - 100',
			description: t('airquality.euaqi.text.4'),
		},
		{
			name: t('airquality.euaqi.value.5'),
			textColor: '!text-veryunhealthy',
			value: '100+',
			description: t('airquality.euaqi.text.5'),
		},
	];
	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('modal.description')}>
				<StyledText type="body">{t('airquality.euaqi.main')}</StyledText>
				<Pressable onPress={() => Linking.openURL('https://airindex.eea.europa.eu/AQI/')} className="mt-4">
					<StyledText type="link">https://airindex.eea.europa.eu/AQI/</StyledText>
				</Pressable>
			</ContentRow>
			<ContentRow title={t('airquality.index.values')}>
				<ValuesList values={EUAQIValues} />
			</ContentRow>
		</View>
	);
};
