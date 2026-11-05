import { useMemo } from 'react';
import { getAlerts, getMostSevereAlert } from '../../utils/alertFilters';
import { useWeather } from './weatherStore';

export const useAlerts = () => {
	const weather = useWeather((state) => state.weatherData);

	return useMemo(() => {
		const alerts = weather ? getAlerts(weather.alerts.alert, weather.location) : [];
		return { alerts, mostSevere: getMostSevereAlert(alerts) };
	}, [weather]);
};
