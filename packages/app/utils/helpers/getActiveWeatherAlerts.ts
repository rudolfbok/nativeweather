import { WeatherAlert } from 'app/types/weatherAlert';

const getAlertKey = (alert: WeatherAlert) => alert.identifier || `${alert.event}|${alert.areas}|${alert.effective}|${alert.expires}`;

export const getActiveWeatherAlerts = (alerts: WeatherAlert[] = []) =>
	alerts.filter(
		(alert, index, self) =>
			alert.msgtype === 'Alert' && index === self.findIndex((candidate) => getAlertKey(candidate) === getAlertKey(alert))
	);
