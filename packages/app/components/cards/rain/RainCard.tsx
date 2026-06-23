import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorage';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../../common/styled/StyledModal';
import { StyledText } from '../../common/styled/StyledText';
import { RainIcon } from '../../icons/main/RainIcon';
import { DataCard } from '../DataCard';
import { RainModal } from './RainModal';

interface RainCardProps {
	rainPrecipMm: number;
	rainPrecipIn: number;
	rainChance: number;
}

export const RainCard = ({ rainPrecipMm, rainPrecipIn, rainChance }: RainCardProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	const display = switchMetrics({
		metric: `${rainPrecipMm.toFixed(1)}mm`,
		imperial: `${rainPrecipIn.toFixed(2)}in`,
		currentUnits: currentUnits,
	});

	const rainChanceRanges = [
		{ max: 10, description: t('precipitation.chance.0') },
		{ max: 30, description: t('precipitation.chance.1') },
		{ max: 50, description: t('precipitation.chance.2') },
		{ max: 70, description: t('precipitation.chance.3') },
		{ max: 90, description: t('precipitation.chance.4') },
		{ max: 100, description: t('precipitation.chance.5') },
		{ max: Infinity, description: t('precipitation.chance.6') },
	];

	const description = rainChanceRanges.find((range) => rainChance < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={Platform.OS === 'ios' ? () => router.push('/modals/rain') : () => setShowModal(true)}
			icon={<RainIcon />}
			title={t('rain.title')}
			description={description}
			extraContent={
				(rainPrecipMm >= 0.1 || rainPrecipIn >= 0.1) && (
					<StyledText type="body">
						{t('rain.rainfall')} {display}
					</StyledText>
				)
			}
			data={Math.round(rainChance) + '%'}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<RainIcon />}
						header={t('rain.title')}
						onClose={() => setShowModal(false)}
					>
						<RainModal />
					</StyledModal>
				)
			}
		/>
	);
};
