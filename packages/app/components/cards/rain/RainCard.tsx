import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useStorageString } from 'app/database/useStorage';
import { switchMetrics } from 'app/utils/formatting/selectUnitValue';
import { useState } from 'react';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RainIcon } from 'app/components/icons/main/RainIcon';
import { DataCard } from '../DataCard';
import { RainModal } from './RainModal';

interface RainCardProps {
	rainPrecipMm: number;
	rainPrecipIn: number;
	rainChance: number;
	showBackdrop?: boolean;
	onCloseParent?: () => void;
}

export const RainCard = ({ rainPrecipMm, rainPrecipIn, rainChance, showBackdrop, onCloseParent }: RainCardProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();

	const navigateToRain = useModalNavigation({
		mobile: () => router.push('/modals/rain'),
		macos: () => setModalScreen('rain'),
		web: () => setShowModal(true),
	});

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
			onPress={navigateToRain}
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
						onClose={() => {
							setShowModal(false);
							onCloseParent?.();
						}}
						goBackHeader={Boolean(onCloseParent)}
						goBackOnPress={() => setShowModal(false)}
						showBackdrop={showBackdrop}
					>
						<RainModal />
					</StyledModal>
				)
			}
		/>
	);
};
