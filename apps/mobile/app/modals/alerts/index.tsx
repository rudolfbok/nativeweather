import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { AlertModal } from 'app/components/weather/alerts/AlertModal';
import { useWeather } from 'app/hooks/useWeather';
import { getAlerts } from 'app/utils/helpers/getAlerts';

export default function AlertModalScreen() {
	const { weatherData } = useWeather();
	const filteredAlerts = getAlerts(weatherData?.alerts.alert, weatherData?.location);

	return (
		<ModalScrollView>
			<AlertModal filteredAlerts={filteredAlerts} />
		</ModalScrollView>
	);
}
