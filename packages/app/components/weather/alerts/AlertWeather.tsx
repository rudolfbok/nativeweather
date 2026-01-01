import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledPressable } from 'app/components/common/StyledPressable';
import { WeatherAlert } from 'app/types/weatherAlert';
import { clsx } from 'clsx';
import { ChevronRight, CircleAlert } from 'lucide-react-native';
import { useState } from 'react';
import { CardHeader } from '../../common/CardHeader';
import { AlertModal } from './AlertModal';

interface AlertWeatherProps {
	filteredAlerts: WeatherAlert[];
	alertsLength: number;
}

export const AlertWeather = ({ filteredAlerts, alertsLength }: AlertWeatherProps) => {
	const { t } = useTranslate('weather');
	const tolgee = useTolgee();
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [selectedAlert, setSelectedAlert] = useState(null);

	if (alertsLength === 0) return null;

	return (
		<>
			{/* Mobile version */}
			<StyledPressable
				onPress={() => setShowAlertModal(true)}
				className={clsx('ios:mt-4 w-full flex-row items-center justify-between rounded-3xl p-4 lg:hidden')}
			>
				<CardHeader
					icon={<CircleAlert color="#007AFF" />}
					header={`${alertsLength} ${t('alerts.title')}${tolgee.getLanguage() === 'en' && alertsLength > 1 ? 's' : ''}`}
				/>
				<ChevronRight color="#007AFF" size={26} />
			</StyledPressable>

			{/* Desktop version */}
			<StyledPressable
				onPress={() => setShowAlertModal(true)}
				className="web:bg-transparent web:dark:bg-transparent left-0 w-fit flex-row items-center gap-2 rounded-3xl p-2 max-lg:hidden"
			>
				<CardHeader icon={<CircleAlert color="#007AFF" size={28} />} header={String(alertsLength)} />
			</StyledPressable>

			{showAlertModal && (
				<AlertModal
					visible={showAlertModal}
					onClose={() => {
						setShowAlertModal(false);
						setSelectedAlert(null);
					}}
					goBackOnPress={() => setSelectedAlert(null)}
					filteredAlerts={filteredAlerts}
					selectedAlert={selectedAlert}
					onPress={(alert) => setSelectedAlert(alert)}
				/>
			)}
		</>
	);
};
