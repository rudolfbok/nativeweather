import { useTranslate } from '@tolgee/react';
import { Snowflake } from 'lucide-react-native';
import { useState } from 'react';
import { DataCard } from './DataCard';
import { SnowModal } from './modals/SnowModal';
import { StyledText } from '../common/StyledText';
import { useSwitchMetrics } from 'app/hooks/useSwitchMetrics';
import { useStorageString } from 'app/storage/useStorageString';

interface SnowCardProps {
	snowPrecipCm: number;
	snowPrecipIn: number;
	snowChance: number;
}

export const SnowCard = ({ snowPrecipCm, snowPrecipIn, snowChance }: SnowCardProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);

	// const value = useSwitchMetrics({
	// 	metric: Math.round(snowPrecipCm),
	// 	imperial: Math.round(snowPrecipIn),
	// 	currentUnits: currentUnits,
	// });

	const display = useSwitchMetrics({
		metric: `${snowPrecipCm.toFixed(1)}cm`,
		imperial: `${snowPrecipIn.toFixed(2)}in`,
		currentUnits: currentUnits,
	});

	const snowChanceRanges = [
		{ max: 0, description: t('description.snow.0') },
		{ max: 29, description: t('description.snow.1') },
		{ max: 79, description: t('description.snow.2') },
		{ max: Infinity, description: t('description.snow.3') },
	];

	const description = snowChanceRanges.find((range) => snowChance < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={() => setShowModal(true)}
			icon={<Snowflake color="#3796B8" />}
			modal={showModal && <SnowModal visible={showModal} onClose={() => setShowModal(false)} />}
			title={t('snow.title')}
			description={description}
			extraContent={
				(snowPrecipCm >= 0.01 || snowPrecipIn >= 0.01) && (
					<StyledText type="body">
						{t('snow.snowfall')} {display}
					</StyledText>
				)
			}
			data={snowChance + '%'}
		/>
	);
};
