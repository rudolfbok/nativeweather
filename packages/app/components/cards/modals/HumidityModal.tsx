import { useTranslate } from '@tolgee/react';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { ValuesList } from 'app/components/common/ValuesList';
import { clsx } from 'clsx';
import { Droplets } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';

export const HumidityModal = ({
	visible,
	onClose
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	const humidityScaleValues = [
		{
			name: t('description.humidity.0'),
			value: '0 - 20%'
		},
		{
			name: t('description.humidity.1'),
			value: '20 - 40%'
		},
		{
			name: t('description.humidity.2'),
			value: '40 - 60%'
		},
		{
			name: t('description.humidity.3'),
			value: '60 - 80%'
		},
		{
			name: t('description.humidity.4'),
			value: '80 - 100%'
		}
	];

	return (
		<StyledModal visible={visible} icon={<Droplets color="#3DA443" />} header={t('humidity.title')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<ContentRow title={t('humidity.relativehumidity.title')}>
					<StyledText type="body">{t('humidity.relativehumidity.text')}</StyledText>
				</ContentRow>
				<ContentRow title={t('humidity.relativehumidity.values')}>
					<ValuesList values={humidityScaleValues} valueColor="!text-[#3DA443]" />
				</ContentRow>
				<ContentRow title={t('humidity.dewpoint.title')}>
					<StyledText type="body">{t('humidity.dewpoint.text')}</StyledText>
				</ContentRow>
			</View>
		</StyledModal>
	);
};
