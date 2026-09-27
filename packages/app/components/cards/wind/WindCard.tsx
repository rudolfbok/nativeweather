import { useTranslate } from '@tolgee/react';
import { WindIcon } from 'app/components/icons/main';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useStorageString } from 'app/database/useStorage';
import { getDirection } from 'app/utils/mappings/windDirection';
import { switchMetrics } from 'app/utils/formatting/selectUnitValue';
import { clsx } from 'clsx';
import { Wind } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { StyledText } from 'app/components/common/styled/StyledText';
import { WindArrowIcon } from 'app/components/icons/ui/WindArrowIcon';
import { DataCard } from '../DataCard';
import { WindModal } from './WindModal';

interface WindCardProps {
	windKm: number;
	windMil: number;
	gustKm?: number;
	gustMil?: number;
	degree?: number;
	details: boolean;
	currentWind: boolean;
	showBackdrop?: boolean;
	onCloseParent?: () => void;
}

export const WindCard = ({
	windKm,
	windMil,
	gustKm,
	gustMil,
	degree,
	details,
	currentWind,
	showBackdrop,
	onCloseParent,
}: WindCardProps) => {
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);
	const { t } = useTranslate('weather');
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToWind = useModalNavigation({
		mobile: () => router.push('/modals/wind'),
		macos: () => setModalScreen('wind'),
		web: () => setShowModal(true),
	});

	const displaySpeed = switchMetrics({
		metric: `${Math.round(windKm)}km/h`,
		imperial: `${Math.round(windMil)}mph`,
		currentUnits: currentUnits,
	});

	const displayGust = switchMetrics({
		metric: `${Math.round(gustKm ?? 0)}km/h`,
		imperial: `${Math.round(gustMil ?? 0)}mph`,
		currentUnits: currentUnits,
	});

	const windSpeedRanges = [
		{ max_kmh: 0, max_mph: 0, description: t('description.windspeed.0') },
		{ max_kmh: 5, max_mph: 2, description: t('description.windspeed.1') },
		{ max_kmh: 11, max_mph: 7, description: t('description.windspeed.2') },
		{ max_kmh: 19, max_mph: 12, description: t('description.windspeed.3') },
		{ max_kmh: 28, max_mph: 18, description: t('description.windspeed.4') },
		{ max_kmh: 38, max_mph: 24, description: t('description.windspeed.5') },
		{ max_kmh: 49, max_mph: 31, description: t('description.windspeed.6') },
		{ max_kmh: 61, max_mph: 38, description: t('description.windspeed.7') },
		{ max_kmh: 74, max_mph: 46, description: t('description.windspeed.8') },
		{ max_kmh: 88, max_mph: 54, description: t('description.windspeed.9') },
		{ max_kmh: 102, max_mph: 63, description: t('description.windspeed.10') },
		{ max_kmh: 117, max_mph: 72, description: t('description.windspeed.11') },
		{ max_kmh: Infinity, max_mph: Infinity, description: t('description.windspeed.12') },
	];

	const description =
		windSpeedRanges.find((range) => {
			if (currentUnits === 'metric') {
				return windKm < range.max_kmh;
			} else {
				return windMil < range.max_mph;
			}
		})?.description ?? '';

	return (
		<DataCard
			onPress={navigateToWind}
			icon={<WindIcon />}
			title={t('wind.title')}
			description={description}
			extraContent={
				details && (
					<View className={clsx('flex flex-row items-center gap-1')}>
						<StyledText type="body">{t('wind.direction.main')}</StyledText>
						<StyledText type="body">{getDirection(degree, 'short', t)}</StyledText>
						<WindArrowIcon degree={degree ?? 0} />
					</View>
				)
			}
			data={displaySpeed}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<WindIcon />}
						header={t('wind.title')}
						onClose={() => {
							setShowModal(false);
							onCloseParent?.();
						}}
						goBackHeader={Boolean(onCloseParent)}
						goBackOnPress={() => setShowModal(false)}
						showBackdrop={showBackdrop}
					>
						<WindModal currentWind={currentWind} degree={degree ?? 0} speed={displaySpeed} gust={displayGust} />
					</StyledModal>
				)
			}
		/>
	);
};
