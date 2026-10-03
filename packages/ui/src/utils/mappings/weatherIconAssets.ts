import { Asset } from 'expo-asset';
import { getWeatherCondition } from '@nativeweather/core/constants/weatherConditions';

export interface WeatherAPIMainIcon {
	isDay: 0 | 1;
	code: number | null;
}
const dayIcons: Record<string, number> = {
	clear: require('../../assets/weathericons/clear-day.png'),
	partclouds: require('../../assets/weathericons/partclouds-day.png'),
	cloudy: require('../../assets/weathericons/cloudy-day.png'),
	overcast: require('../../assets/weathericons/overcast-day.png'),
	fog: require('../../assets/weathericons/fog-day.png'),
	obscured: require('../../assets/weathericons/fog-day.png'),
	freezingfog: require('../../assets/weathericons/freezingfog-day.png'),
	lightrain: require('../../assets/weathericons/lightrain-day.png'),
	freezingrain: require('../../assets/weathericons/freezingrain-day.png'),
	lightsnow: require('../../assets/weathericons/lightsnow-day.png'),
	snow: require('../../assets/weathericons/snow.png'),
	blizzard: require('../../assets/weathericons/blizzard.png'),
	thunder: require('../../assets/weathericons/thunderstorm-day.png'),
	rain: require('../../assets/weathericons/rain-day.png'),
};
const nightIcons: Record<string, number> = {
	clear: require('../../assets/weathericons/clear-night.png'),
	partclouds: require('../../assets/weathericons/partclouds-night.png'),
	cloudy: require('../../assets/weathericons/cloudy-night.png'),
	overcast: require('../../assets/weathericons/overcast-night.png'),
	fog: require('../../assets/weathericons/fog-night.png'),
	obscured: require('../../assets/weathericons/fog-night.png'),
	freezingfog: require('../../assets/weathericons/freezingfog-night.png'),
	lightrain: require('../../assets/weathericons/lightrain-night.png'),
	freezingrain: require('../../assets/weathericons/freezingrain-night.png'),
	lightsnow: require('../../assets/weathericons/lightsnow-night.png'),
	snow: require('../../assets/weathericons/snow.png'),
	blizzard: require('../../assets/weathericons/blizzard.png'),
	thunder: require('../../assets/weathericons/thunderstorm-night.png'),
	rain: require('../../assets/weathericons/rain-night.png'),
};
const getWeatherIconAsset = ({ isDay, code }: WeatherAPIMainIcon): number => {
	const condition = getWeatherCondition(code) ?? getWeatherCondition(1009);
	const icons = isDay === 1 ? dayIcons : nightIcons;
	return icons[condition?.icon ?? 'overcast'] ?? icons.overcast;
};
export const getWeatherIconUri = async ({ isDay, code }: WeatherAPIMainIcon): Promise<string> => {
	const asset = Asset.fromModule(getWeatherIconAsset({ isDay, code }));
	await asset.downloadAsync();
	if (!asset.localUri) throw new Error(`Weather icon localUri missing for code ${code}`);
	return asset.localUri;
};
