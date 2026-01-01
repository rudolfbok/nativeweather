import { useTranslate } from '@tolgee/react';
import { useSwitchMetrics } from 'app/hooks/useSwitchMetrics';
import { useStorageString } from 'app/storage/useStorageString';
import { CloudRain } from 'lucide-react-native';
import { useState } from 'react';
import { StyledText } from '../common/StyledText';
import { DataCard } from './DataCard';
import { RainModal } from './modals/RainModal';

interface RainCardProps {
	rainPrecipMm: number;
	rainPrecipIn: number;
	rainChance: number;
}

export const RainCard = ({ rainPrecipMm, rainPrecipIn, rainChance }: RainCardProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);
	const display = useSwitchMetrics({
		metric: `${rainPrecipMm.toFixed(1)}mm`,
		imperial: `${rainPrecipIn.toFixed(2)}in`,
		currentUnits: currentUnits,
	});

	const rainChanceRanges = [
		{ max: 1, description: t('description.rain.chance.0') },
		{ max: 10, description: t('description.rain.chance.1') },
		{ max: 30, description: t('description.rain.chance.2') },
		{ max: 50, description: t('description.rain.chance.3') },
		{ max: 70, description: t('description.rain.chance.4') },
		{ max: 90, description: t('description.rain.chance.5') },
		{ max: Infinity, description: t('description.rain.chance.6') },
	];

	const description = rainChanceRanges.find((range) => rainChance < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={() => setShowModal(true)}
			modal={showModal && <RainModal visible={showModal} onClose={() => setShowModal(false)} />}
			icon={<CloudRain color="#2793FF" />}
			title={t('rain.title')}
			description={description}
			extraContent={
				(rainPrecipMm >= 0.1 || rainPrecipIn >= 0.01) && (
					<StyledText type="body">
						{t('rain.rainfall')} {display}
					</StyledText>
				)
			}
			data={rainChance + '%'}
		/>
	);
};
