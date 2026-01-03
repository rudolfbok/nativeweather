import { RoundView } from 'app/components/common/RoundView';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { CloudRain } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { Separator } from 'app/components/common/Separator';
import { ModalValueItem } from './ModalValueItem';

export const RainModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	const rainPrecipValues = [
		{
			name: t('description.rain.chance.0'),
			value: '0 - 10%',
			description: t('rain.chance.text.0'),
		},
		{
			name: t('description.rain.chance.1'),
			value: '10 - 30%',
			description: t('rain.chance.text.1'),
		},
		{
			name: t('description.rain.chance.2'),
			value: '30 - 50%',
			description: t('rain.chance.text.2'),
		},
		{
			name: t('description.rain.chance.3'),
			value: '50 - 70%',
			description: t('rain.chance.text.3'),
		},
		{
			name: t('description.rain.chance.4'),
			value: '70 - 90%',
			description: t('rain.chance.text.4'),
		},
		{
			name: t('description.rain.chance.5'),
			value: '90 - 100%',
			description: t('rain.chance.text.5'),
		},
	];

	return (
		<StyledModal visible={visible} icon={<CloudRain color="#2793FF" />} header={t('rain.title')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<StyledText type="subtitle">{t('rain.chance.title')}</StyledText>
				<RoundView className={clsx('p-4')}>
					<StyledText type="body">{t('rain.chance.description')}</StyledText>
				</RoundView>
				<StyledText type="subtitle">{t('rain.chance.values')}</StyledText>
				<RoundView className={clsx('gap-2 p-4')}>
					{rainPrecipValues.map(({ name, value, description }, index) => (
						<View key={index} className={clsx('gap-4')}>
							<ModalValueItem
								showItemIndex={false}
								name={name}
								textcolor="!text-primaryblue"
								value={value}
								description={description}
							/>
							{index < rainPrecipValues.length - 1 && <Separator />}
						</View>
					))}
				</RoundView>
			</View>
		</StyledModal>
	);
};
