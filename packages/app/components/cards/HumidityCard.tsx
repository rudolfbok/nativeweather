import { useTranslate } from '@tolgee/react';
import { useSwitchTemp } from 'app/hooks/useSwitchTemp';
import { useStorageString } from 'app/storage/useStorageString';
import { Droplets } from 'lucide-react-native';
import { useState } from 'react';
import { StyledText } from '../common/StyledText';
import { DataCard } from './DataCard';
import { HumidityModal } from './modals/HumidityModal';

interface HumidityCardProps {
	data: number;
	dewPoint?: boolean;
	dewPointC?: number;
	dewPointF?: number;
}

export const HumidityCard = ({ data, dewPoint, dewPointC, dewPointF }: HumidityCardProps) => {
	const { t } = useTranslate('weather');
	const [currentTemp] = useStorageString('currentTemp');
	const [showModal, setShowModal] = useState(false);

	const dewPointValue = dewPoint
		? useSwitchTemp({
				celsius: Math.round(dewPointC ?? 0),
				fahrenheit: Math.round(dewPointF ?? 0),
				currentTemp: currentTemp,
			})
		: null;

	const humidityRanges = [
		{ max: 20, description: t('description.humidity.0') },
		{ max: 40, description: t('description.humidity.1') },
		{ max: 60, description: t('description.humidity.2') },
		{ max: 80, description: t('description.humidity.3') },
		{ max: Infinity, description: t('description.humidity.4') },
	];

	const description = humidityRanges.find((range) => data < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={() => setShowModal(true)}
			modal={showModal && <HumidityModal visible={showModal} onClose={() => setShowModal(false)} />}
			icon={<Droplets color="#3DA443" />}
			title={t('humidity.title')}
			description={description}
			extraContent={
				dewPoint && (
					<StyledText type="body">
						{t('humidity.dewpoint.title')}: {dewPointValue}
					</StyledText>
				)
			}
			data={data + '%'}
		/>
	);
};
