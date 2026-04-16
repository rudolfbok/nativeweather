import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { WeatherAlert } from 'app/types/weatherAlert';
import { clsx } from 'clsx';
import { ChevronRight, CircleAlert } from 'lucide-react-native';
import { useState } from 'react';
import { AlertModal } from './AlertModal';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';

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

	if (alertsLength === 0) return null;

	return (
		<>
			<StyledPressable
				onPress={Platform.OS === 'ios' ? () => router.push('/modals/alerts') : () => setShowAlertModal(true)}
				className={clsx('native:mt-4 w-full flex-row items-center justify-between rounded-3xl p-4', mobile)}
			>
				<CardHeader
					icon={<CircleAlert color="#007AFF" />}
					header={`${alertsLength} ${t('alerts.title')}${tolgee.getLanguage() === 'en-US' && alertsLength > 1 ? 's' : ''}`}
				/>
				<ChevronRight color="#007AFF" size={26} />
			</StyledPressable>

			<StyledPressable
				onPress={() => setShowAlertModal(true)}
				className={clsx(
					'web:bg-transparent web:dark:bg-transparent absolute bottom-0 left-0 w-fit flex-row items-center gap-2 rounded-3xl p-2',
					desktop
				)}
			>
				<CardHeader icon={<CircleAlert color="#007AFF" size={28} />} header={String(alertsLength)} />
			</StyledPressable>

			{showAlertModal && (
				<StyledModal
					visible={showAlertModal}
					icon={selectedAlert ? undefined : <CircleAlert color="#007AFF" />}
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
