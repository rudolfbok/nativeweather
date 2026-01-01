import { useTranslate } from '@tolgee/react';
import { useSwitchMetrics } from 'app/hooks/useSwitchMetrics';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { Wind } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { StyledText } from '../common/StyledText';
import { WindArrowIcon } from '../icons/WindArrowIcon';
import { DataCard } from './DataCard';
import { WindModal } from './modals/WindModal';

interface WindCardProps {
	windKm: number;
	windMil: number;
	gustKm?: number;
	gustMil?: number;
	dir?: string;
	degree?: number;
	details: boolean;
	currentWind: boolean;
}

export const WindCard = ({ windKm, windMil, gustKm, gustMil, dir, degree, details, currentWind }: WindCardProps) => {
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);
	const { t } = useTranslate('weather');

	const displaySpeed = useSwitchMetrics({
		metric: `${Math.round(windKm)}km/h`,
		imperial: `${Math.round(windMil)}mph`,
		currentUnits: currentUnits,
	});

	const displayGust = useSwitchMetrics({
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
			onPress={() => setShowModal(true)}
			modal={
				showModal && (
					<WindModal
						visible={showModal}
						currentWind={currentWind}
						onClose={() => setShowModal(false)}
						degree={degree ?? 0}
						speed={displaySpeed}
						gust={displayGust}
						dir={dir}
					/>
				)
			}
			icon={<Wind color="gray" />}
			title={t('wind.title')}
			description={description}
			extraContent={
				details && (
					<View className={clsx('flex flex-row items-center gap-1')}>
						<StyledText type="body">{t('wind.direction.main')}</StyledText>
						<StyledText type="body">{t(`wind.direction.${dir ?? 'N'}`)}</StyledText>
						<WindArrowIcon degree={degree ?? 0} />
					</View>
				)
			}
			data={displaySpeed}
		/>
	);
};
