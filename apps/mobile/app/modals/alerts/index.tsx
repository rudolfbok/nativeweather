import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { AlertModal } from '@nativeweather/ui/components/alerts/AlertModal';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { getAlerts } from '@nativeweather/core/utils/alertFilters';
import React from 'react';

export default function AlertModalScreen() {
	const { weatherData } = useWeather();
	const filteredAlerts = getAlerts(weatherData?.alerts.alert, weatherData?.location);

	return (
		<ModalScrollView>
			<AlertModal filteredAlerts={filteredAlerts} />
		</ModalScrollView>
	);
}
