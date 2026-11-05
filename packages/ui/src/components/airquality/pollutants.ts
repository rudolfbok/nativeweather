import type { Pollutant } from '@nativeweather/core';
import type { OpenMeteoAQI } from '@nativeweather/types';

interface PollutantInfo {
	label: string;
	/** Key under `airquality.item`. */
	itemKey: string;
	units: string;
	/** Key prefix of the level names, which differ per index. */
	levelKey: string;
	/** Title of the levels list. */
	listKey: string;
	link?: string;
	value: (current: OpenMeteoAQI['current']) => number;
}

const pollutantLevel = { levelKey: 'airquality.value', listKey: 'airquality.pollutant.values', units: 'μg/m³' };

export const pollutants: Record<Pollutant, PollutantInfo> = {
	euaqi: {
		label: 'EU AQI',
		itemKey: 'euaqi',
		units: '',
		levelKey: 'airquality.euaqi.value',
		listKey: 'airquality.index.values',
		link: 'https://airindex.eea.europa.eu/AQI/',
		value: (current) => current.european_aqi,
	},
	usaqi: {
		label: 'US AQI',
		itemKey: 'usaqi',
		units: '',
		levelKey: 'airquality.usaqi.value',
		listKey: 'airquality.index.values',
		link: 'https://www.airnow.gov/',
		value: (current) => current.us_aqi,
	},
	pm25: { label: 'PM2.5', itemKey: 'pm25', ...pollutantLevel, value: (current) => current.pm2_5 },
	pm10: { label: 'PM10', itemKey: 'pm10', ...pollutantLevel, value: (current) => current.pm10 },
	o3: { label: 'O3', itemKey: 'ozone', ...pollutantLevel, value: (current) => current.ozone },
	no2: { label: 'NO2', itemKey: 'no2', ...pollutantLevel, value: (current) => current.nitrogen_dioxide },
};

export const pollutantIds = Object.keys(pollutants) as Pollutant[];

export const isPollutant = (value: string): value is Pollutant => Object.hasOwn(pollutants, value);
