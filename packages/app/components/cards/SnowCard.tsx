import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorage';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../common/styled/StyledModal';
import { StyledText } from '../common/styled/StyledText';
import { SnowIcon } from '../icons/main/SnowIcon';
import { DataCard } from './DataCard';
import { SnowModal } from './modals/SnowModal';

interface SnowCardProps {
	snowPrecipCm: number;
	snowPrecipIn: number;
	snowChance: number;
}

export const SnowCard = ({ snowPrecipCm, snowPrecipIn, snowChance }: SnowCardProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	const display = switchMetrics({
		metric: `${snowPrecipCm ?? (0).toFixed(1)}cm`,
		imperial: `${snowPrecipIn ?? (0).toFixed(2)}in`,
		currentUnits: currentUnits,
	});

	const snowChanceRanges = [
		{ max: 10, description: t('precipitation.chance.0') },
		{ max: 30, description: t('precipitation.chance.1') },
		{ max: 50, description: t('precipitation.snow.chance.2') },
		{ max: 70, description: t('precipitation.chance.3') },
		{ max: 90, description: t('precipitation.chance.4') },
		{ max: 100, description: t('precipitation.chance.5') },
		{ max: Infinity, description: t('precipitation.chance.6') },
	];

	const description = snowChanceRanges.find((range) => snowChance < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={Platform.OS === 'ios' ? () => router.push('/modals/snow') : () => setShowModal(true)}
			icon={<SnowIcon />}
			title={t('snow.title')}
			description={description}
			extraContent={
				(snowPrecipCm >= 0.1 || snowPrecipIn >= 0.1) && (
					<StyledText type="body">
						{t('snow.snowfall')} {display}
					</StyledText>
				)
			}
			data={snowChance + '%'}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<SnowIcon />}
						header={t('snow.title')}
						onClose={() => setShowModal(false)}
					>
						<SnowModal />
					</StyledModal>
				)
			}
		/>
	);
};
