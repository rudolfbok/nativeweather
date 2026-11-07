import { getWeatherCondition } from '@nativeweather/api';
import type { ConditionIconFamily } from '@nativeweather/api';
import { Asset } from 'expo-asset';

// [day, night] artwork. Families without a night variant list the same file twice.
const icons: Record<ConditionIconFamily, [number, number]> = {
	clear: [
		require('../../../../assets/weathericons/clear-day.png'),
		require('../../../../assets/weathericons/clear-night.png'),
	],
	partclouds: [
		require('../../../../assets/weathericons/partclouds-day.png'),
		require('../../../../assets/weathericons/partclouds-night.png'),
	],
	cloudy: [
		require('../../../../assets/weathericons/cloudy-day.png'),
		require('../../../../assets/weathericons/cloudy-night.png'),
	],
	overcast: [
		require('../../../../assets/weathericons/overcast-day.png'),
		require('../../../../assets/weathericons/overcast-night.png'),
	],
	fog: [
		require('../../../../assets/weathericons/fog-day.png'),
		require('../../../../assets/weathericons/fog-night.png'),
	],
	obscured: [
		require('../../../../assets/weathericons/fog-day.png'),
		require('../../../../assets/weathericons/fog-night.png'),
	],
	freezingfog: [
		require('../../../../assets/weathericons/freezingfog-day.png'),
		require('../../../../assets/weathericons/freezingfog-night.png'),
	],
	lightrain: [
		require('../../../../assets/weathericons/lightrain-day.png'),
		require('../../../../assets/weathericons/lightrain-night.png'),
	],
	freezingrain: [
		require('../../../../assets/weathericons/freezingrain-day.png'),
		require('../../../../assets/weathericons/freezingrain-night.png'),
	],
	lightsnow: [
		require('../../../../assets/weathericons/lightsnow-day.png'),
		require('../../../../assets/weathericons/lightsnow-night.png'),
	],
	snow: [require('../../../../assets/weathericons/snow.png'), require('../../../../assets/weathericons/snow.png')],
	blizzard: [
		require('../../../../assets/weathericons/blizzard.png'),
		require('../../../../assets/weathericons/blizzard.png'),
	],
	thunder: [
		require('../../../../assets/weathericons/thunderstorm-day.png'),
		require('../../../../assets/weathericons/thunderstorm-night.png'),
	],
	rain: [
		require('../../../../assets/weathericons/rain-day.png'),
		require('../../../../assets/weathericons/rain-night.png'),
	],
};

export const getWeatherIconUri = async (code: number, isDay: 0 | 1): Promise<string> => {
	const family = getWeatherCondition(code)?.icon ?? 'overcast';
	const asset = Asset.fromModule(icons[family][isDay === 1 ? 0 : 1]);
	await asset.downloadAsync();
	if (!asset.localUri) throw new Error(`Weather icon localUri missing for code ${code}`);
	return asset.localUri;
};
