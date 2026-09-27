import { Asset } from 'expo-asset';

export interface WeatherAPIMainIcon {
	isDay: 0 | 1;
	code: number;
}

const dayIcons: Record<number, number> = {
	1000: require('../../assets/weathericons/clear-day.png'),
	1003: require('../../assets/weathericons/partclouds-day.png'),
	1006: require('../../assets/weathericons/cloudy-day.png'),
	1009: require('../../assets/weathericons/overcast-day.png'),
	1030: require('../../assets/weathericons/fog-day.png'),
	1036: require('../../assets/weathericons/fog-day.png'),
	1063: require('../../assets/weathericons/lightrain-day.png'),
	1066: require('../../assets/weathericons/lightsnow-day.png'),
	1069: require('../../assets/weathericons/lightrain-day.png'),
	1072: require('../../assets/weathericons/freezingrain-day.png'),
	1087: require('../../assets/weathericons/thunderstorm-day.png'),
	1114: require('../../assets/weathericons/snow.png'),
	1117: require('../../assets/weathericons/blizzard.png'),
	1135: require('../../assets/weathericons/fog-day.png'),
	1147: require('../../assets/weathericons/freezingfog-day.png'),
	1150: require('../../assets/weathericons/lightrain-day.png'),
	1153: require('../../assets/weathericons/lightrain-day.png'),
	1168: require('../../assets/weathericons/lightrain-day.png'),
	1171: require('../../assets/weathericons/lightrain-day.png'),
	1180: require('../../assets/weathericons/lightrain-day.png'),
	1183: require('../../assets/weathericons/lightrain-day.png'),
	1186: require('../../assets/weathericons/rain-day.png'),
	1189: require('../../assets/weathericons/rain-day.png'),
	1192: require('../../assets/weathericons/rain-day.png'),
	1195: require('../../assets/weathericons/rain-day.png'),
	1198: require('../../assets/weathericons/freezingrain-day.png'),
	1201: require('../../assets/weathericons/freezingrain-day.png'),
	1204: require('../../assets/weathericons/lightsnow-day.png'),
	1207: require('../../assets/weathericons/snow.png'),
	1210: require('../../assets/weathericons/lightsnow-day.png'),
	1213: require('../../assets/weathericons/lightsnow-day.png'),
	1216: require('../../assets/weathericons/snow.png'),
	1219: require('../../assets/weathericons/snow.png'),
	1222: require('../../assets/weathericons/snow.png'),
	1225: require('../../assets/weathericons/snow.png'),
	1237: require('../../assets/weathericons/snow.png'),
	1240: require('../../assets/weathericons/thunderstorm-day.png'),
	1243: require('../../assets/weathericons/thunderstorm-day.png'),
	1246: require('../../assets/weathericons/thunderstorm-day.png'),
	1249: require('../../assets/weathericons/thunderstorm-day.png'),
	1252: require('../../assets/weathericons/thunderstorm-day.png'),
	1255: require('../../assets/weathericons/thunderstorm-day.png'),
	1258: require('../../assets/weathericons/thunderstorm-day.png'),
	1261: require('../../assets/weathericons/thunderstorm-day.png'),
	1264: require('../../assets/weathericons/thunderstorm-day.png'),
	1273: require('../../assets/weathericons/thunderstorm-day.png'),
	1276: require('../../assets/weathericons/thunderstorm-day.png'),
	1279: require('../../assets/weathericons/thunderstorm-day.png'),
	1282: require('../../assets/weathericons/thunderstorm-day.png'),
};

const nightIcons: Record<number, number> = {
	1000: require('../../assets/weathericons/clear-night.png'),
	1003: require('../../assets/weathericons/partclouds-night.png'),
	1006: require('../../assets/weathericons/cloudy-night.png'),
	1009: require('../../assets/weathericons/overcast-night.png'),
	1030: require('../../assets/weathericons/fog-night.png'),
	1036: require('../../assets/weathericons/fog-night.png'),
	1063: require('../../assets/weathericons/lightrain-night.png'),
	1066: require('../../assets/weathericons/lightsnow-night.png'),
	1069: require('../../assets/weathericons/lightrain-night.png'),
	1072: require('../../assets/weathericons/freezingrain-night.png'),
	1087: require('../../assets/weathericons/thunderstorm-night.png'),
	1114: require('../../assets/weathericons/snow.png'),
	1117: require('../../assets/weathericons/blizzard.png'),
	1135: require('../../assets/weathericons/fog-night.png'),
	1147: require('../../assets/weathericons/freezingfog-night.png'),
	1150: require('../../assets/weathericons/lightrain-night.png'),
	1153: require('../../assets/weathericons/lightrain-night.png'),
	1168: require('../../assets/weathericons/lightrain-night.png'),
	1171: require('../../assets/weathericons/lightrain-night.png'),
	1180: require('../../assets/weathericons/lightrain-night.png'),
	1183: require('../../assets/weathericons/lightrain-night.png'),
	1186: require('../../assets/weathericons/rain-night.png'),
	1189: require('../../assets/weathericons/rain-night.png'),
	1192: require('../../assets/weathericons/rain-night.png'),
	1195: require('../../assets/weathericons/rain-night.png'),
	1198: require('../../assets/weathericons/freezingrain-night.png'),
	1201: require('../../assets/weathericons/freezingrain-night.png'),
	1204: require('../../assets/weathericons/lightsnow-night.png'),
	1207: require('../../assets/weathericons/snow.png'),
	1210: require('../../assets/weathericons/lightsnow-night.png'),
	1213: require('../../assets/weathericons/lightsnow-night.png'),
	1216: require('../../assets/weathericons/snow.png'),
	1219: require('../../assets/weathericons/snow.png'),
	1222: require('../../assets/weathericons/snow.png'),
	1225: require('../../assets/weathericons/snow.png'),
	1237: require('../../assets/weathericons/snow.png'),
	1240: require('../../assets/weathericons/thunderstorm-night.png'),
	1243: require('../../assets/weathericons/thunderstorm-night.png'),
	1246: require('../../assets/weathericons/thunderstorm-night.png'),
	1249: require('../../assets/weathericons/thunderstorm-night.png'),
	1252: require('../../assets/weathericons/thunderstorm-night.png'),
	1255: require('../../assets/weathericons/thunderstorm-night.png'),
	1258: require('../../assets/weathericons/thunderstorm-night.png'),
	1261: require('../../assets/weathericons/thunderstorm-night.png'),
	1264: require('../../assets/weathericons/thunderstorm-night.png'),
	1273: require('../../assets/weathericons/thunderstorm-night.png'),
	1276: require('../../assets/weathericons/thunderstorm-night.png'),
	1279: require('../../assets/weathericons/thunderstorm-night.png'),
	1282: require('../../assets/weathericons/thunderstorm-night.png'),
};

const getWeatherIconAsset = ({ isDay, code }: WeatherAPIMainIcon): number => {
	const icons = isDay === 1 ? dayIcons : nightIcons;
	return icons[code] ?? icons[1009];
};

export const getWeatherIconUri = async ({ isDay, code }: WeatherAPIMainIcon): Promise<string> => {
	const moduleId = getWeatherIconAsset({ isDay, code });
	const asset = Asset.fromModule(moduleId);

	await asset.downloadAsync();

	if (!asset.localUri) {
		throw new Error(`Weather icon localUri missing for code ${code}`);
	}

	return asset.localUri;
};
