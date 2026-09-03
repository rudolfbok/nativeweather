import { Blizzard } from 'app/components/icons/weather/blizzard/Blizzard';
import { ClearDay } from 'app/components/icons/weather/clear/ClearDay';
import { ClearNight } from 'app/components/icons/weather/clear/ClearNight';
import { CloudyDay } from 'app/components/icons/weather/cloudy/CloudyDay';
import { CloudyNight } from 'app/components/icons/weather/cloudy/CloudyNight';
import { FogDay } from 'app/components/icons/weather/fog/FogDay';
import { FogNight } from 'app/components/icons/weather/fog/FogNight';
import { FreezingFogDay } from 'app/components/icons/weather/freezingfog/FreezingFogDay';
import { FreezingFogNight } from 'app/components/icons/weather/freezingfog/FreezingFogNight';
import { FreezingRainDay } from 'app/components/icons/weather/freezingrain/FreezingRainDay';
import { FreezingRainNight } from 'app/components/icons/weather/freezingrain/FreezingRainNight';
import { LightRainDay } from 'app/components/icons/weather/lightrain/LightRainDay';
import { LightRainNight } from 'app/components/icons/weather/lightrain/LightRainNight';
import { LightSnowDay } from 'app/components/icons/weather/lightsnow/LightSnowDay';
import { LightSnowNight } from 'app/components/icons/weather/lightsnow/LightSnowNight';
import { OvercastDay } from 'app/components/icons/weather/overcast/OvercastDay';
import { OvercastNight } from 'app/components/icons/weather/overcast/OvercastNight';
import { PartCloudsDay } from 'app/components/icons/weather/partclouds/PartCloudsDay';
import { PartCloudsNight } from 'app/components/icons/weather/partclouds/PartCloudsNight';
import { RainDay } from 'app/components/icons/weather/rain/RainDay';
import { RainNight } from 'app/components/icons/weather/rain/RainNight';
import { Snow } from 'app/components/icons/weather/snow/Snow';
import { StormDay } from 'app/components/icons/weather/storm/StormDay';
import { StormNight } from 'app/components/icons/weather/storm/StormNight';
import React from 'react';

interface WeatherAPIMainIconProps {
	isDay: 0 | 1;
	code: number;
	width: number;
	height: number;
	strokeWidth?: number;
}

const dayIcons: Record<number, React.ComponentType<any>> = {
	1000: ClearDay,
	1003: PartCloudsDay,
	1006: CloudyDay,
	1009: OvercastDay,
	1030: FogDay,
	1036: FogDay,
	1063: LightRainDay,
	1066: LightSnowDay,
	1069: LightRainDay,
	1072: FreezingRainDay,
	1087: StormDay,
	1114: Snow,
	1117: Blizzard,
	1135: FogDay,
	1147: FreezingFogDay,
	1150: LightRainDay,
	1153: LightRainDay,
	1168: LightRainDay,
	1171: LightRainDay,
	1180: LightRainDay,
	1183: LightRainDay,
	1186: RainDay,
	1189: RainDay,
	1192: RainDay,
	1195: RainDay,
	1198: FreezingRainDay,
	1201: FreezingRainDay,
	1204: LightSnowDay,
	1207: Snow,
	1210: LightSnowDay,
	1213: LightSnowDay,
	1216: Snow,
	1219: Snow,
	1222: Snow,
	1225: Snow,
	1237: Snow,
	1240: StormDay,
	1243: StormDay,
	1246: StormDay,
	1249: StormDay,
	1252: StormDay,
	1255: StormDay,
	1258: StormDay,
	1261: StormDay,
	1264: StormDay,
	1273: StormDay,
	1276: StormDay,
	1279: StormDay,
	1282: StormDay,
};

const nightIcons: Record<number, React.ComponentType<any>> = {
	1000: ClearNight,
	1003: PartCloudsNight,
	1006: CloudyNight,
	1009: OvercastNight,
	1030: FogNight,
	1036: FogNight,
	1063: LightRainNight,
	1066: LightSnowNight,
	1069: LightRainNight,
	1072: FreezingRainNight,
	1087: StormNight,
	1114: Snow,
	1117: Blizzard,
	1135: FogNight,
	1147: FreezingFogNight,
	1150: LightRainNight,
	1153: LightRainNight,
	1168: LightRainNight,
	1171: LightRainNight,
	1180: LightRainNight,
	1183: LightRainNight,
	1186: RainNight,
	1189: RainNight,
	1192: RainNight,
	1195: RainNight,
	1198: FreezingRainNight,
	1201: FreezingRainNight,
	1204: LightSnowNight,
	1207: Snow,
	1210: LightSnowNight,
	1213: LightSnowNight,
	1216: Snow,
	1219: Snow,
	1222: Snow,
	1225: Snow,
	1237: Snow,
	1240: StormNight,
	1243: StormNight,
	1246: StormNight,
	1249: StormNight,
	1252: StormNight,
	1255: StormNight,
	1258: StormNight,
	1261: StormNight,
	1264: StormNight,
	1273: StormNight,
	1276: StormNight,
	1279: StormNight,
	1282: StormNight,
};

export const WeatherAPIMainIcon = ({ isDay, code, width, height, strokeWidth }: WeatherAPIMainIconProps) => {
	const icons = isDay === 1 ? dayIcons : nightIcons;
	const IconComponent = icons[code] || OvercastDay;

	return <IconComponent width={width} height={height} strokeWidth={strokeWidth!} />;
};
