import { useTranslate } from '@tolgee/react';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledText } from 'app/components/common/StyledText';
import { ValuesList } from 'app/components/common/ValuesList';
import { clsx } from 'clsx';
import { Linking, Pressable, View } from 'react-native';

export const USAQIDetail = () => {
	const { t } = useTranslate('weather');
	const USAQIValues = [
		{
			name: t('airquality.usaqi.value.0'),
			textColor: '!text-fair',
			value: '0 - 50',
			description: t('airquality.usaqi.text.0')
		},
		{
			name: t('airquality.usaqi.value.1'),
			textColor: '!text-moderate',
			value: '50 - 100',
			description: t('airquality.usaqi.text.1')
		},
		{
			name: t('airquality.usaqi.value.2'),
			textColor: '!text-sensitive',
			value: '100 - 150',
			description: t('airquality.usaqi.text.2')
		},
		{
			name: t('airquality.usaqi.value.3'),
			textColor: '!text-unhealthy',
			value: '150 - 200',
			description: t('airquality.usaqi.text.3')
		},
		{
			name: t('airquality.usaqi.value.4'),
			textColor: '!text-veryunhealthy',
			value: '200 - 300',
			description: t('airquality.usaqi.text.4')
		},
		{
			name: t('airquality.usaqi.value.5'),
			textColor: '!text-hazardous',
			value: '300 - 500',
			description: t('airquality.usaqi.text.5')
		}
	];
	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('modal.description')}>
				<StyledText type="body">{t('airquality.usaqi.main')}</StyledText>
				<Pressable onPress={() => Linking.openURL('https://www.airnow.gov/')}>
					<StyledText type="link">https://www.airnow.gov/</StyledText>
				</Pressable>
			</ContentRow>
			<ContentRow title={t('airquality.index.values')}>
				<ValuesList values={USAQIValues} />
			</ContentRow>
		</View>
	);
};
