import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { AlertDetail } from 'app/components/weather/alerts/AlertDetail';
import { useWeather } from 'app/hooks/useWeather';
import { getActiveWeatherAlerts } from 'app/utils/helpers/getActiveWeatherAlerts';
import { useLocalSearchParams } from 'expo-router';

export default function AlertDetailScreen() {
	const { alert } = useLocalSearchParams<{ alert?: string }>();
	const { weatherData } = useWeather();
	const filteredAlerts = getActiveWeatherAlerts(weatherData?.alerts.alert, weatherData?.location);
	const selectedAlert = filteredAlerts[Number(alert)];

	if (!selectedAlert) return null;

	return (
		<ModalScrollView>
			<AlertDetail
				severity={selectedAlert.severity}
				area={selectedAlert.areas}
				expires={selectedAlert.expires}
				description={selectedAlert.desc}
				instructions={selectedAlert.instruction}
			/>
		</ModalScrollView>
	);
}
