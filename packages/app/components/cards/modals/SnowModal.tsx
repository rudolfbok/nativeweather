import { useTranslate } from '@tolgee/react';
import { Accordion } from 'app/components/common/Accordion';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { ValuesList } from 'app/components/common/ValuesList';
import { useStorageString } from 'app/storage/useStorageString';
import { Snowflake } from 'lucide-react-native';
import { GestureResponderEvent } from 'react-native';

export const SnowModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const switchUnits = (cm: string, inches: string) => (currentUnits === 'metric' ? cm + 'cm' : inches + 'in');

	const snowChanceValues = [
		{
			name: t('precipitation.chance.0'),
			value: '0 - 10%',
			description: t('snow.chance.text.0'),
		},
		{
			name: t('precipitation.chance.1'),
			value: '10 - 30%',
			description: t('snow.chance.text.1'),
		},
		{
			name: t('precipitation.snow.chance.2'),
			value: '30 - 50%',
			description: t('snow.chance.text.2'),
		},
		{
			name: t('precipitation.chance.3'),
			value: '50 - 70%',
			description: t('snow.chance.text.3'),
		},
		{
			name: t('precipitation.chance.4'),
			value: '70 - 90%',
			description: t('snow.chance.text.4'),
		},
		{
			name: t('precipitation.chance.5'),
			value: '90 - 100%',
			description: t('snow.chance.text.5'),
		},
	];

	const snowPrecipValues = [
		{
			name: t('precipitation.snowfall.0'),
			value: switchUnits('1 - 2', '0.4 - 0.8'),
		},
		{
			name: t('precipitation.snowfall.1'),
			value: switchUnits('2 - 10', '0.8 - 4.0'),
		},
		{
			name: t('precipitation.snowfall.2'),
			value: switchUnits('10 - 30', '4.0 - 12.0'),
		},
		{
			name: t('precipitation.snowfall.3'),
			value: switchUnits('30 - 50', '12.0 - 20.0'),
		},
		{
			name: t('precipitation.snowfall.4'),
			value: switchUnits('> 50', '> 20.0'),
		},
	];

	return (
		<StyledModal visible={visible} icon={<Snowflake color="#3796B8" />} header={t('snow.title')} onClose={onClose}>
			<ContentRow title={t('snow.chance.title')}>
				<StyledText type="body">{t('snow.chance.description')}</StyledText>
			</ContentRow>
			<Accordion title={t('snow.chance.values')}>
				<ValuesList values={snowChanceValues} valueColor="!text-[#3796B8]" showIndex={false} />
			</Accordion>
			<ContentRow title={t('snow.snowfall.title')}>
				<StyledText type="body">{t('snow.snowfall.description')}</StyledText>
			</ContentRow>
			<Accordion title={t('snow.snowfall.values')}>
				<ValuesList values={snowPrecipValues} valueColor="!text-[#3796B8]" showIndex={false} />
			</Accordion>
		</StyledModal>
	);
};
