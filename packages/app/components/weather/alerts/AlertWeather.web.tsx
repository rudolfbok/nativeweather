import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { WeatherAlert } from 'app/types/weatherAPI';
import { clsx } from 'clsx';
import { ChevronRight, BadgeAlert } from 'lucide-react-native';
import { useState } from 'react';
import { AlertModal } from './AlertModal';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { getAlertSeverityDotColor } from 'app/utils/mappings/mapAlertSeverity';
import { AlertIcon } from 'app/components/icons/AlertIcon';
import { useSwitchColors } from 'app/hooks/useSwitchColors';

interface AlertWeatherProps {
	filteredAlerts: WeatherAlert[];
	alertsLength: number;
	desktop?: string;
	mobile?: string;
}

export const AlertWeather = ({ filteredAlerts, alertsLength, desktop, mobile }: AlertWeatherProps) => {
	const { t } = useTranslate('weather');
	const tolgee = useTolgee();
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [selectedAlert, setSelectedAlert] = useState(null);
	const router = useRouter();
	const textColor = useSwitchColors('black', 'white');

	if (alertsLength === 0) return null;

	const severityValues: Record<string, number> = {
		Unknown: 0,
		Minor: 1,
		Moderate: 2,
		Severe: 3,
		Extreme: 4,
	};

	const mostSevereAlert = filteredAlerts.reduce((mostSevereAlert, alert) => {
		if (severityValues[alert.severity] > severityValues[mostSevereAlert.severity]) {
			return alert;
		}

		return mostSevereAlert;
	});

	const alertIconColor = getAlertSeverityDotColor(mostSevereAlert.severity);

	return (
		<>
			<StyledPressable
				onPress={Platform.OS === 'ios' ? () => router.push('/modals/alerts') : () => setShowAlertModal(true)}
				className={clsx('native:mt-4 w-full flex-row items-center justify-between rounded-3xl p-4', mobile)}
			>
				<CardHeader
					icon={<AlertIcon mostSevere={alertIconColor} />}
					header={`${alertsLength} ${t('alerts.title')}${tolgee.getLanguage() === 'en-US' && alertsLength > 1 ? 's' : ''}`}
				/>
				<ChevronRight color={textColor} size={26} />
			</StyledPressable>

			{showAlertModal && (
				<StyledModal
					visible={showAlertModal}
					icon={selectedAlert ? undefined : <BadgeAlert color="#007AFF" />}
					header={selectedAlert === null ? t('alerts.modaltitle') : selectedAlert.event}
					goBackHeader={selectedAlert ? true : false}
					goBackOnPress={() => setSelectedAlert(null)}
					onClose={() => {
						setShowAlertModal(false);
						setSelectedAlert(null);
					}}
				>
					<AlertModal
						onPress={(alert) => setSelectedAlert(alert)}
						filteredAlerts={filteredAlerts}
						selectedAlert={selectedAlert}
					/>
				</StyledModal>
				// <AlertModal
				// 	visible={showAlertModal}
				// 	onClose={() => {
				// 		setShowAlertModal(false);
				// 		setSelectedAlert(null);
				// 	}}
				// 	goBackOnPress={() => setSelectedAlert(null)}
				// 	filteredAlerts={filteredAlerts}
				// 	selectedAlert={selectedAlert}
				// 	onPress={(alert) => setSelectedAlert(alert)}
				// />
			)}
		</>
	);
};
