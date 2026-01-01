import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { useTranslate } from '@tolgee/react';
import { Droplets } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { clsx } from 'clsx';
import { RoundView } from 'app/components/common/RoundView';
import { ModalValueItem } from './ModalValueItem';
import { Separator } from 'app/components/common/Separator';

export const HumidityModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	const humidityScaleValues = [
		{
			name: t('description.humidity.0'),
			value: '0 - 20%',
		},
		{
			name: t('description.humidity.1'),
			value: '20 - 40%',
		},
		{
			name: t('description.humidity.2'),
			value: '40 - 60%',
		},
		{
			name: t('description.humidity.3'),
			value: '60 - 80%',
		},
		{
			name: t('description.humidity.4'),
			value: '80 - 100%',
		},
	];

	return (
		<StyledModal visible={visible} icon={<Droplets color="#3DA443" />} header={t('humidity.title')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<View>
					<StyledText type="subtitle">{t('humidity.relativehumidity.title')}</StyledText>
					<StyledText type="body">{t('humidity.relativehumidity.text')}</StyledText>
				</View>
				<RoundView className={clsx('gap-4 p-4')}>
					{humidityScaleValues.map(({ name, value }, index) => (
						<View key={index} className={clsx('gap-4')}>
							<ModalValueItem showItemIndex={false} name={name} textcolor="!text-[#3DA443]" value={value} />
							{index < humidityScaleValues.length - 1 && <Separator />}
						</View>
					))}
				</RoundView>
				<View>
					<StyledText type="subtitle">{t('humidity.dewpoint.title')}</StyledText>
					<StyledText type="body">{t('humidity.dewpoint.text')}</StyledText>
				</View>
			</View>
		</StyledModal>
	);
};
