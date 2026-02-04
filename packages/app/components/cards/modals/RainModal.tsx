import { useTranslate } from '@tolgee/react';
import { Accordion } from 'app/components/common/Accordion';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { ValuesList } from 'app/components/common/ValuesList';
import { useStorageString } from 'app/storage/useStorageString';
import { CloudRain } from 'lucide-react-native';
import { GestureResponderEvent } from 'react-native';

export const RainModal = ({
	visible,
	onClose
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
			description: t('rain.chance.text.0')
		},
		{
			name: t('precipitation.chance.1'),
			value: '10 - 30%',
			description: t('rain.chance.text.1')
		},
		{
			name: t('precipitation.chance.2'),
			value: '30 - 50%',
			description: t('rain.chance.text.2')
		},
		{
			name: t('precipitation.chance.3'),
			value: '50 - 70%',
			description: t('rain.chance.text.3')
		},
		{
			name: t('precipitation.chance.4'),
			value: '70 - 90%',
			description: t('rain.chance.text.4')
		},
		{
			name: t('precipitation.chance.5'),
			value: '90 - 100%',
			description: t('rain.chance.text.5')
		}
	];

	const rainPrecipValues = [
		{
			name: t('precipitation.rainfall.0'),
			value: switchUnits('0,1 - 2', '0.01 - 0.08')
		},
		{
			name: t('precipitation.rainfall.1'),
			value: switchUnits('2 - 10', '0.08 - 0.40')
		},
		{
			name: t('precipitation.rainfall.2'),
			value: switchUnits('10 - 30', '0.40 - 1.20')
		},
		{
			name: t('precipitation.rainfall.3'),
			value: switchUnits('30 - 50', '1.20 - 2.00')
		},
		{
			name: t('precipitation.rainfall.4'),
			value: switchUnits('> 50', '> 2.00')
		}
	];

	return (
		<StyledModal visible={visible} icon={<CloudRain color="#2793FF" />} header={t('rain.title')} onClose={onClose}>
			<ContentRow title={t('rain.chance.title')}>
				<StyledText type="body">{t('rain.chance.description')}</StyledText>
			</ContentRow>
			<Accordion title={t('rain.chance.values')}>
				<ValuesList values={rainChanceValues} valueColor="!text-[#2793FF]" showIndex={false} />
			</Accordion>
			<ContentRow title={t('rain.rainfall.title')}>
				<StyledText type="body">{t('rain.rainfall.description')}</StyledText>
			</ContentRow>
			<Accordion title={t('rain.rainfall.values')}>
				<ValuesList values={rainPrecipValues} valueColor="!text-[#2793FF]" showIndex={false} />
			</Accordion>
		</StyledModal>
	);
};
