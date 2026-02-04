import { useTranslate } from '@tolgee/react';
import { useSwitchMetrics } from 'app/hooks/useSwitchMetrics';
import { useStorageString } from 'app/storage/useStorageString';
import { Eye } from 'lucide-react-native';
import { useState } from 'react';
import { DataCard } from './DataCard';
import { VisibilityModal } from './modals/VisibilityModal';

interface VisibilityCardProps {
	visKm: number;
	visMiles: number;
}

export const VisibilityCard = ({ visKm, visMiles }: VisibilityCardProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);

	const display = useSwitchMetrics({
		metric: `${Math.round(visKm)}km`,
		imperial: `${Math.round(visMiles)}mil`,
		currentUnits: currentUnits,
	});

	const visibilityRanges = [
		{ max_km: 1, max_mil: 1, description: t('description.visibility.0') },
		{ max_km: 2, max_mil: 2, description: t('description.visibility.1') },
		{ max_km: 4, max_mil: 3, description: t('description.visibility.2') },
		{ max_km: 10, max_mil: 6, description: t('description.visibility.3') },
		{ max_km: 20, max_mil: 12, description: t('description.visibility.4') },
		{ max_km: 50, max_mil: 30, description: t('description.visibility.5') },
		{ max_km: Infinity, max_mil: Infinity, description: t('description.visibility.6') },
	];

	const description =
		visibilityRanges.find((range) => {
			if (currentUnits === 'metric') {
				return visKm < range.max_km;
			} else {
				return visMiles < range.max_mil;
			}
		})?.description ?? '';

	return (
		<DataCard
			onPress={() => setShowModal(true)}
			modal={showModal && <VisibilityModal visible={showModal} onClose={() => setShowModal(false)} />}
			icon={<Eye color="#39C1C7" />}
			title={t('visibility.title')}
			description={description}
			data={display}
		/>
	);
};
