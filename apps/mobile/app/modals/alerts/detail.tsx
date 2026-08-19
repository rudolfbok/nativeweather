import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';
import { AlertDetail } from 'app/components/alerts/AlertDetail';
import { useWeather } from 'app/hooks/weather/useWeather';
import { getAlerts } from 'app/utils/alertFilters';
import { useEffect } from 'react';

export default function AlertDetailScreen() {
	const { alert } = useLocalSearchParams<{ alert?: string }>();
	const { weatherData } = useWeather();
	const navigation = useNavigation();
	const filteredAlerts = getAlerts(weatherData?.alerts.alert, weatherData?.location);
	const selectedAlert = filteredAlerts[Number(alert)];

	useEffect(() => {
		if (!selectedAlert) return;

		navigation.setOptions({
			headerTitle: selectedAlert.event,
		});
	}, [navigation, selectedAlert]);

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
