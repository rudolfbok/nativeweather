import { useNavigation } from '@react-navigation/native';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { AlertDetail } from 'app/components/weather/alerts/AlertDetail';
import { useWeather } from 'app/hooks/useWeather';
import { getAlerts } from 'app/utils/helpers/getAlerts';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

export default function AlertDetailScreen() {
	const { alert } = useLocalSearchParams<{ alert?: string }>();
	const { weatherData } = useWeather();
	const navigation = useNavigation();
	const filteredAlerts = getAlerts(weatherData?.alerts.alert, weatherData?.location);
	const selectedAlert = filteredAlerts[Number(alert)];

	if (!selectedAlert) return null;

	useEffect(() => {
		navigation.setOptions({
			headerTitle: selectedAlert.event,
		});
	}, [selectedAlert]);

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
