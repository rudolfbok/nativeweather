import { getWeatherCondition } from '@nativeweather/api';
import type { ConditionIconFamily } from '@nativeweather/api';

// WeatherAPI's 60 conditions collapse into these `weather` namespace labels.
const familyLabels: Record<ConditionIconFamily, string> = {
	clear: 'condition.clear.day',
	partclouds: 'condition.partlycloudy',
	cloudy: 'condition.cloudy',
	overcast: 'condition.overcast',
	fog: 'condition.fog',
	obscured: 'condition.haze',
	freezingfog: 'condition.freezingfog',
	lightrain: 'condition.lightrain',
	freezingrain: 'condition.freezingrain',
	lightsnow: 'condition.lightsnow',
	snow: 'condition.snow',
	blizzard: 'condition.blizzard',
	thunder: 'condition.thunderstorm',
	rain: 'condition.rain',
};

// Dust, sand and Saharan dust share the "obscured" icon with haze, smoke and smog.
const dustCodes = new Set([1015, 1018, 1021, 1024, 1027, 1045, 1048]);

export const getConditionLabelKey = (code: number, isDay: 0 | 1): string => {
	const condition = getWeatherCondition(code);
	if (!condition) return familyLabels.overcast;
	if (condition.icon === 'clear') return isDay === 1 ? 'condition.clear.day' : 'condition.clear.night';
	if (dustCodes.has(code)) return 'condition.dust';
	// Sleet and ice pellets use the freezing-rain icon but are not freezing rain.
	if (condition.precipitation === 'sleet' || condition.precipitation === 'ice') return 'condition.sleet';
	return familyLabels[condition.icon];
};
