import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { AlertModal } from 'app/components/weather/alerts/AlertModal';
import { useWeather } from 'app/hooks/useWeather';
import { getActiveWeatherAlerts } from 'app/utils/helpers/getActiveWeatherAlerts';

export default function AlertModalScreen() {
	const { weatherData } = useWeather();
	const filteredAlerts = getActiveWeatherAlerts(weatherData?.alerts.alert);

	return (
		<ModalScrollView>
			<AlertModal filteredAlerts={filteredAlerts} />
		</ModalScrollView>
	);
}
