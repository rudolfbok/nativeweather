import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { CardHeader } from 'app/components/common/layout/CardHeader';
import { AlertIcon } from 'app/components/icons/main/AlertIcon';
import { ChevronIcon } from 'app/components/icons/ui/ChevronIcon';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { WeatherAlert } from 'app/types/weatherAPI';
import { getMostSevereAlert } from 'app/utils/alertFilters';
import { getAlertSeverityDotColor } from 'app/utils/mappings/alertSeverity';
import { clsx } from 'clsx';
import { useState } from 'react';
import { View } from 'react-native';
import { AlertModal } from './AlertModal';
import { border } from 'app/constants/border';

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

	const alertIconColor = getAlertSeverityDotColor(getMostSevereAlert(filteredAlerts)?.severity ?? 'Unknown');

	return (
		<>
			<StyledPressable
				onPress={navigateToAlerts}
				className={clsx(
					'w-full flex-row items-center justify-between rounded-3xl p-4',
					border
				)}
			>
				<CardHeader
					icon={<AlertIcon mostSevere={alertIconColor} />}
					header={`${alertsLength} ${t('alerts.title')}${tolgee.getLanguage() === 'en-US' && alertsLength > 1 ? 's' : ''}`}
					className={clsx('min-w-0 flex-1')}
				/>
				<View className={clsx('flex-shrink-0')}>
					<ChevronIcon />
				</View>
			</StyledPressable>
			{showAlertModal && (
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
			)}
		</>
	);
};
