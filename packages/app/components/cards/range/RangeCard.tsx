import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorage';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../../common/styled/StyledModal';
import { RangeIcon } from 'app/components/icons/main/RangeIcon';
import { DataCard } from '../DataCard';
import { RangeModal } from './RangeModal';

interface RangeCardProps {
	visKm: number;
	visMiles: number;
}

export const RangeCard = ({ visKm, visMiles }: RangeCardProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	const display = switchMetrics({
		metric: `${Math.round(visKm)}km`,
		imperial: `${Math.round(visMiles)}mil`,
		currentUnits: currentUnits,
	});

	const rangeRanges = [
		{ max_km: 1, max_mil: 1, description: t('description.range.0') },
		{ max_km: 2, max_mil: 2, description: t('description.range.1') },
		{ max_km: 4, max_mil: 3, description: t('description.range.2') },
		{ max_km: 10, max_mil: 6, description: t('description.range.3') },
		{ max_km: 20, max_mil: 12, description: t('description.range.4') },
		{ max_km: 50, max_mil: 30, description: t('description.range.5') },
		{ max_km: Infinity, max_mil: Infinity, description: t('description.range.6') },
	];

	const description =
		rangeRanges.find((range) => {
			if (currentUnits === 'metric') {
				return visKm < range.max_km;
			} else {
				return visMiles < range.max_mil;
			}
		})?.description ?? '';

	return (
		<DataCard
			onPress={Platform.OS === 'ios' ? () => router.push('/modals/range') : () => setShowModal(true)}
			icon={<RangeIcon />}
			title={t('range.title')}
			description={description}
			data={display}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<RangeIcon />}
						header={t('range.title')}
						onClose={() => setShowModal(false)}
					>
						<RangeModal />
					</StyledModal>
				)
			}
		/>
	);
};
