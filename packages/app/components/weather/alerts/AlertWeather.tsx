import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { AlertIcon } from 'app/components/icons/main/AlertIcon';
import { ChevronIcon } from 'app/components/icons/ui/ChevronIcon';
import { useModalNavigation } from 'app/hooks/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/useNavigation.macos';
import { WeatherAlert } from 'app/types/weatherAPI';
import { getAlertSeverityDotColor } from 'app/utils/mappings/mapAlertSeverity';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
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
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToAlerts = useModalNavigation({
		mobile: () => router.push('/modals/alerts'),
		macos: () => setModalScreen('alerts'),
		web: () => setShowAlertModal(true),
	});

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
				onPress={navigateToAlerts}
				className={clsx('w-full flex-row items-center justify-between rounded-3xl p-4')}
				liquidGlass={true}
			>
				<CardHeader
					icon={<AlertIcon mostSevere={alertIconColor} />}
					header={`${alertsLength} ${t('alerts.title')}${tolgee.getLanguage() === 'en-US' && alertsLength > 1 ? 's' : ''}`}
				/>
				<ChevronIcon />
			</StyledPressable>

			{Platform.OS !== 'macos' && showAlertModal && (
				<StyledModal
					visible={showAlertModal}
					icon={selectedAlert ? undefined : <AlertIcon mostSevere={alertIconColor} />}
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
