import { RoundView } from 'app/components/common/RoundView';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { CloudRain } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { Separator } from 'app/components/common/Separator';
import { ModalValueItem } from './ModalValueItem';
import { Accordion } from 'app/components/common/Accordion';
import { useStorageString } from 'app/storage/useStorageString';

export const RainModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const switchUnits = (mm: string, inches: string) => (currentUnits === 'metric' ? mm + 'mm' : inches + 'in');

	const rainChanceValues = [
		{
			name: t('precipitation.chance.0'),
			value: '0 - 10%',
			description: t('rain.chance.text.0'),
		},
		{
			name: t('precipitation.chance.1'),
			value: '10 - 30%',
			description: t('rain.chance.text.1'),
		},
		{
			name: t('precipitation.chance.2'),
			value: '30 - 50%',
			description: t('rain.chance.text.2'),
		},
		{
			name: t('precipitation.chance.3'),
			value: '50 - 70%',
			description: t('rain.chance.text.3'),
		},
		{
			name: t('precipitation.chance.4'),
			value: '70 - 90%',
			description: t('rain.chance.text.4'),
		},
		{
			name: t('precipitation.chance.5'),
			value: '90 - 100%',
			description: t('rain.chance.text.5'),
		},
	];

	const rainPrecipValues = [
		{
			name: t('precipitation.rainfall.0'),
			value: switchUnits('0,1 - 2', '0.01 - 0.08'),
		},
		{
			name: t('precipitation.rainfall.1'),
			value: switchUnits('2 - 10', '0.08 - 0.40'),
		},
		{
			name: t('precipitation.rainfall.2'),
			value: switchUnits('10 - 30', '0.40 - 1.20'),
		},
		{
			name: t('precipitation.rainfall.3'),
			value: switchUnits('30 - 50', '1.20 - 2.00'),
		},
		{
			name: t('precipitation.rainfall.4'),
			value: switchUnits('> 50', '> 2.00'),
		},
	];

	return (
		<StyledModal visible={visible} icon={<CloudRain color="#2793FF" />} header={t('rain.title')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<StyledText type="subtitle">{t('rain.chance.title')}</StyledText>
				<RoundView className={clsx('p-4')}>
					<StyledText type="body">{t('rain.chance.description')}</StyledText>
				</RoundView>
				<Accordion title={t('rain.chance.values')}>
					<RoundView className={clsx('gap-2 p-4')}>
						{rainChanceValues.map(({ name, value, description }, index) => (
							<View key={index} className={clsx('gap-4')}>
								<ModalValueItem
									showItemIndex={false}
									name={name}
									textcolor="!text-primaryblue"
									value={value}
									description={description}
								/>
								{index < rainChanceValues.length - 1 && <Separator />}
							</View>
						))}
					</RoundView>
				</Accordion>
				<StyledText type="subtitle">{t('rain.rainfall.title')}</StyledText>
				<RoundView className={clsx('p-4')}>
					<StyledText type="body">{t('rain.rainfall.description')}</StyledText>
				</RoundView>
				<Accordion title={t('rain.rainfall.values')}>
					<RoundView className={clsx('gap-2 p-4')}>
						{rainPrecipValues.map(({ name, value }, index) => (
							<View key={index} className={clsx('gap-4')}>
								<ModalValueItem showItemIndex={false} name={name} textcolor="!text-primaryblue" value={value} />
								{index < rainPrecipValues.length - 1 && <Separator />}
							</View>
						))}
					</RoundView>
				</Accordion>
			</View>
		</StyledModal>
	);
};
