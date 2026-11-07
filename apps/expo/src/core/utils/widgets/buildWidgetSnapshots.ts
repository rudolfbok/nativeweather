import type { NormalizedData, OpenMeteoAQI } from '@nativeweather/types';
import { formatTemperature } from '../formatting/formatTemperature';
import { getAirQualityLevel } from '../mappings/airQuality';
import type { AirQualityLevel } from '../mappings/airQuality';
import { getConditionLabelKey } from '../mappings/conditionLabel';
import { getLandscapeKey } from '../mappings/landscapeColors';
import type { LandscapeKey } from '../mappings/landscapeColors';

export interface WidgetPreferences {
	currentTemp: string;
	currentAQI: string;
}

export interface LocalWidgetSnapshot {
	city: string;
	region: string;
	temperature: string;
	minTemperature: string;
	maxTemperature: string;
	conditionKey: string;
	code: number;
	isDay: 0 | 1;
	landscape: LandscapeKey | null;
}

export interface AirQualityWidgetSnapshot {
	aqi: number;
	pollutants: { label: string; value: number; level: AirQualityLevel }[];
}

/** Display-ready strings and levels; colours, icons and translations are resolved by the caller. */
export const buildLocalWidgetSnapshot = (
	weather: NormalizedData,
	{ currentTemp }: WidgetPreferences
): LocalWidgetSnapshot => {
	const { current, location } = weather;
	const day = weather.forecast.forecastday[0].day;
	const format = (celsius: number, fahrenheit: number) => formatTemperature({ celsius, fahrenheit, currentTemp });

	return {
		city: location.name,
		region: location.region,
		temperature: format(current.tempC, current.tempF),
		minTemperature: format(day.minTempC, day.minTempF),
		maxTemperature: format(day.maxTempC, day.maxTempF),
		conditionKey: getConditionLabelKey(current.condition.code, current.isDay),
		code: current.condition.code,
		isDay: current.isDay,
		landscape: getLandscapeKey(current.condition.code),
	};
};

export const buildAirQualityWidgetSnapshot = (
	{ current }: OpenMeteoAQI,
	{ currentAQI }: WidgetPreferences
): AirQualityWidgetSnapshot => ({
	aqi: currentAQI === 'EU' ? current.european_aqi : current.us_aqi,
	pollutants: [
		{ label: 'PM2.5', value: current.pm2_5, level: getAirQualityLevel('pm25', current.pm2_5) },
		{ label: 'PM10', value: current.pm10, level: getAirQualityLevel('pm10', current.pm10) },
		{ label: 'O3', value: current.ozone, level: getAirQualityLevel('o3', current.ozone) },
		{ label: 'NO2', value: current.nitrogen_dioxide, level: getAirQualityLevel('no2', current.nitrogen_dioxide) },
	],
});
