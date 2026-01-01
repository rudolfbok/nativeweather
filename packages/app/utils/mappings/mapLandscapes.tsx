import { ClearDayLandscape } from 'app/components/landscapes/clear/ClearDay';
import { ClearNightLandscape } from 'app/components/landscapes/clear/ClearNight';
import { FogDayLandscape } from 'app/components/landscapes/fog/FogDay';
import { FogNightLandscape } from 'app/components/landscapes/fog/FogNight';
import { OvercastDayLandscape } from 'app/components/landscapes/overcast/OvercastDay';
import { OvercastNightLandscape } from 'app/components/landscapes/overcast/OvercastNight';
import { PartCloudsDayLandscape } from 'app/components/landscapes/partclouds/PartCloudsDay';
import { PartCloudsNightLandscape } from 'app/components/landscapes/partclouds/PartCloudsNight';
import { RainDayLandscape } from 'app/components/landscapes/rain/RainDay';
import { RainNightLandscape } from 'app/components/landscapes/rain/RainNight';
import { SnowLandscape } from 'app/components/landscapes/snow/Snow';
import { ThunderDayLandscape } from 'app/components/landscapes/thunder/ThunderDay';
import { ThunderNightLandscape } from 'app/components/landscapes/thunder/ThunderNight';

const dayLandscapes: Record<number, React.ComponentType<any>> = {
	1000: ClearDayLandscape,
	1003: PartCloudsDayLandscape,
	1006: PartCloudsDayLandscape,
	1009: OvercastDayLandscape,
	1030: FogDayLandscape,
	1063: RainDayLandscape,
	1066: SnowLandscape,
	1069: RainDayLandscape,
	1072: RainDayLandscape,
	1087: ThunderDayLandscape,
	1114: SnowLandscape,
	1117: SnowLandscape,
	1135: FogDayLandscape,
	1147: FogDayLandscape,
	1150: RainDayLandscape,
	1153: RainDayLandscape,
	1168: RainDayLandscape,
	1171: RainDayLandscape,
	1180: RainDayLandscape,
	1183: RainDayLandscape,
	1186: RainDayLandscape,
	1189: RainDayLandscape,
	1192: RainDayLandscape,
	1195: RainDayLandscape,
	1198: RainDayLandscape,
	1201: RainDayLandscape,
	1204: RainDayLandscape,
	1207: RainDayLandscape,
	1210: SnowLandscape,
	1213: SnowLandscape,
	1216: SnowLandscape,
	1219: SnowLandscape,
	1222: SnowLandscape,
	1225: SnowLandscape,
	1237: SnowLandscape,
	1240: RainDayLandscape,
	1243: RainDayLandscape,
	1246: RainDayLandscape,
	1249: RainDayLandscape,
	1252: RainDayLandscape,
	1255: SnowLandscape,
	1258: SnowLandscape,
	1261: RainDayLandscape,
	1264: RainDayLandscape,
	1273: ThunderDayLandscape,
	1276: ThunderDayLandscape,
	1279: ThunderDayLandscape,
	1282: ThunderDayLandscape,
};

const nightLandscapes: Record<number, React.ComponentType<any>> = {
	1000: ClearNightLandscape,
	1003: PartCloudsNightLandscape,
	1006: PartCloudsNightLandscape,
	1009: OvercastNightLandscape,
	1030: FogNightLandscape,
	1063: RainNightLandscape,
	1066: SnowLandscape,
	1069: RainNightLandscape,
	1072: RainNightLandscape,
	1087: ThunderNightLandscape,
	1114: SnowLandscape,
	1117: SnowLandscape,
	1135: FogNightLandscape,
	1147: FogNightLandscape,
	1150: RainNightLandscape,
	1153: RainNightLandscape,
	1168: RainNightLandscape,
	1171: RainNightLandscape,
	1180: RainNightLandscape,
	1183: RainNightLandscape,
	1186: RainNightLandscape,
	1189: RainNightLandscape,
	1192: RainNightLandscape,
	1195: RainNightLandscape,
	1198: RainNightLandscape,
	1201: RainNightLandscape,
	1204: RainNightLandscape,
	1207: RainNightLandscape,
	1210: SnowLandscape,
	1213: SnowLandscape,
	1216: SnowLandscape,
	1219: SnowLandscape,
	1222: SnowLandscape,
	1225: SnowLandscape,
	1237: SnowLandscape,
	1240: RainNightLandscape,
	1243: RainNightLandscape,
	1246: RainNightLandscape,
	1249: RainNightLandscape,
	1252: RainNightLandscape,
	1255: SnowLandscape,
	1258: SnowLandscape,
	1261: RainNightLandscape,
	1264: RainNightLandscape,
	1273: ThunderNightLandscape,
	1276: ThunderNightLandscape,
	1279: ThunderNightLandscape,
	1282: ThunderNightLandscape,
};

export const WeatherLandscape = ({ isDay, code }: { isDay: 0 | 1; code: number }) => {
	const landscapes = isDay === 1 ? dayLandscapes : nightLandscapes;
	const LandscapeComponent = landscapes[code] || OvercastDayLandscape;

	return <LandscapeComponent />;
};
