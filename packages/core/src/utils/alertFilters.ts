import type { NormalizedData, WeatherAlert } from '@nativeweather/types';
import { removeDiacritics } from './removeDiacritics';

type AlertLocation = Pick<NormalizedData['location'], 'name' | 'region'>;

const getAlertKey = (alert: WeatherAlert) => alert.identifier || alert.event.trim().toLowerCase();

const normalizeArea = (value = '') =>
	removeDiacritics(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();

const getAreaCandidates = (value = '') => {
	const candidates = [value, ...value.split(/[(),;/]/)].map(normalizeArea).filter((candidate) => candidate.length >= 4);

	return Array.from(new Set(candidates));
};

const getLocationAreaCandidates = (location?: AlertLocation) => {
	if (!location) return [];

	const regionCandidates = getAreaCandidates(location.region);

	if (regionCandidates.length > 0) return Array.from(new Set(regionCandidates));

	return getAreaCandidates(location.name);
};

const matchesLocationArea = (alert: WeatherAlert, locationAreaCandidates: string[]) => {
	if (!alert.areas) return true;

	const alertAreas = normalizeArea(alert.areas);

	return locationAreaCandidates.some((candidate) => alertAreas.includes(candidate));
};

export const getAlerts = (alerts: WeatherAlert[] = [], location?: AlertLocation) => {
	const activeAlerts = alerts.filter(
		(alert, index, self) =>
			alert.msgtype === 'Alert' &&
			index === self.findIndex((candidate) => getAlertKey(candidate) === getAlertKey(alert))
	);
	const locationAreaCandidates = getLocationAreaCandidates(location);

	if (locationAreaCandidates.length === 0) return activeAlerts;

	const locationAlerts = activeAlerts.filter((alert) => matchesLocationArea(alert, locationAreaCandidates));

	return locationAlerts.length > 0 ? locationAlerts : activeAlerts;
};

export const getMostSevereAlert = (alerts: WeatherAlert[]) => {
	const severityValues: Record<string, number> = {
		Unknown: 0,
		Minor: 1,
		Moderate: 2,
		Severe: 3,
		Extreme: 4,
	};

	return alerts.reduce<WeatherAlert | undefined>((mostSevere, alert) => {
		if (!mostSevere || severityValues[alert.severity] > severityValues[mostSevere.severity]) return alert;

		return mostSevere;
	}, undefined);
};
