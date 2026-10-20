import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from '../../../hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '../../../hooks/navigation/useNavigation.macos';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { formatTemperature } from '@nativeweather/core/utils/formatting/formatTemperature';
import { useState } from 'react';
import { useRouter } from '../../../hooks/navigation/useRouter';
import { StyledModal } from '../../common/modal/StyledModal';
import { StyledText } from '../../common/styled/StyledText';
import { HumidityIcon } from '../../icons/main/HumidityIcon';
import { DataCard } from '../DataCard';
import { HumidityModal } from './HumidityModal';

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
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToHumidity = useModalNavigation({
		mobile: () => router.push('/modals/humidity'),
		macos: () => setModalScreen('humidity'),
		web: () => setShowModal(true),
	});

	const dewPointValue = dewPoint
		? formatTemperature({
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
			onPress={navigateToHumidity}
			icon={<HumidityIcon />}
			title={t('humidity.title')}
			description={description}
			extraContent={
				dewPoint && (
					<StyledText type="body" className="min-w-0" numberOfLines={1} ellipsizeMode="tail">
						{t('humidity.dewpoint.title')}: {dewPointValue}
					</StyledText>
				)
			}
			data={data + '%'}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<HumidityIcon />}
						header={t('humidity.title')}
						onClose={() => setShowModal(false)}
					>
						<HumidityModal />
					</StyledModal>
				)
			}
		/>
	);
};
