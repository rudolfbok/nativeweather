import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useStorageString } from 'app/storage/useStorage';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { useState } from 'react';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { PressureIcon } from 'app/components/icons/main/PressureIcon';
import { DataCard } from '../DataCard';
import { PressureModal } from './PressureModal';

interface PressureCardProps {
	pressureMb: number;
	pressureIn: number;
}

export const PressureCard = ({ pressureMb, pressureIn }: PressureCardProps) => {
	const [currentUnits] = useStorageString('currentUnits');
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToPressure = useModalNavigation({
		mobile: () => router.push('/modals/pressure'),
		macos: () => setModalScreen('pressure'),
		web: () => setShowModal(true),
	});

	const display = switchMetrics({
		metric: `${Math.round(pressureMb)}hPa`,
		imperial: `${pressureIn.toFixed(1)}inHg`,
		currentUnits: currentUnits,
	});

	const pressureRanges = [
		{ max_hpa: 980, max_inhg: 28.94, description: t('description.pressure.0') },
		{ max_hpa: 995, max_inhg: 29.38, description: t('description.pressure.1') },
		{ max_hpa: 1005, max_inhg: 29.68, description: t('description.pressure.2') },
		{ max_hpa: 1012, max_inhg: 29.88, description: t('description.pressure.3') },
		{ max_hpa: 1020, max_inhg: 30.12, description: t('description.pressure.4') },
		{ max_hpa: 1025, max_inhg: 30.27, description: t('description.pressure.5') },
		{ max_hpa: 1035, max_inhg: 30.56, description: t('description.pressure.6') },
		{ max_hpa: 1045, max_inhg: 30.86, description: t('description.pressure.7') },
		{ max_hpa: Infinity, max_inhg: Infinity, description: t('description.pressure.8') },
	];

	const description =
		pressureRanges.find((range) => {
			if (currentUnits === 'metric') {
				return pressureMb < range.max_hpa;
			} else {
				return pressureIn < range.max_inhg;
			}
		})?.description ?? '';

	return (
		<DataCard
			onPress={navigateToPressure}
			icon={<PressureIcon />}
			title={t('pressure.title')}
			description={description}
			data={display}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<PressureIcon />}
						header={t('pressure.title')}
						onClose={() => setShowModal(false)}
					>
						<PressureModal />
					</StyledModal>
				)
			}
		/>
	);
};
