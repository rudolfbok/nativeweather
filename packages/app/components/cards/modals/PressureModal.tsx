import { useTranslate } from '@tolgee/react';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { ValuesList } from 'app/components/common/ValuesList';
import { useStorageString } from 'app/storage/useStorageString';
import { CircleGauge } from 'lucide-react-native';
import { GestureResponderEvent } from 'react-native';

export const PressureModal = ({
	visible,
	onClose
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const switchUnits = (hectopascals: string, inchesofmercury: string) =>
		currentUnits === 'metric' ? hectopascals + 'hPa' : inchesofmercury + 'inHg';

	const barometricScaleValues = [
		{
			name: t('description.pressure.0'),
			value: switchUnits('< 980', '< 28,94'),
			textColor: '!text-[#E53935]',
			description: t('pressure.text.0')
		},
		{
			name: t('description.pressure.1'),
			value: switchUnits('980 - 995', '28,94 - 29,38'),
			textColor: '!text-[#FB8C00]',
			description: t('pressure.text.1')
		},
		{
			name: t('description.pressure.2'),
			value: switchUnits('996 - 1005', '29,41 - 29,68'),
			textColor: '!text-[#FDD835]',
			description: t('pressure.text.2')
		},
		{
			name: t('description.pressure.3'),
			value: switchUnits('1006 - 1012', '29,71 - 29,88'),
			textColor: '!text-[#43A047]',
			description: t('pressure.text.3')
		},
		{
			name: t('description.pressure.4'),
			value: switchUnits('1013 - 1020', '29,91 - 30,12'),
			textColor: '!text-[#1E88E5]',
			description: t('pressure.text.4')
		},
		{
			name: t('description.pressure.5'),
			value: switchUnits('1021 - 1025', '30,15 - 30,27'),
			textColor: '!text-[#3949AB]',
			description: t('pressure.text.5')
		},
		{
			name: t('description.pressure.6'),
			value: switchUnits('1026 - 1035', '30,30 - 30,56'),
			textColor: '!text-[#6A1B9A]',
			description: t('pressure.text.6')
		},
		{
			name: t('description.pressure.7'),
			value: switchUnits('1036 - 1045', '30,59 - 30,86'),
			textColor: '!text-[#8E24AA]',
			description: t('pressure.text.7')
		},
		{
			name: t('description.pressure.8'),
			value: switchUnits('> 1045 ', '> 30,86'),
			textColor: '!text-[#5D4037]',
			description: t('pressure.text.8')
		}
	];

	return (
		<StyledModal
			visible={visible}
			icon={<CircleGauge color="#5D7987" size={26} />}
			header={t('pressure.title')}
			onClose={onClose}
		>
			<ContentRow title={t('pressure.barometricscale.title')}>
				<StyledText type="body">{t('pressure.barometricscale.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('pressure.barometricscale.values')}>
				<ValuesList values={barometricScaleValues} showIndex={true} />
			</ContentRow>
		</StyledModal>
	);
};
