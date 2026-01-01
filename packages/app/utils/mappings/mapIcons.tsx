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
import { FreezingThunderDay } from 'app/components/icons/weather/freezingthunder/FreezingThunderDay';
import { FreezingThunderNight } from 'app/components/icons/weather/freezingthunder/FreezingThunderNight';
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
import { ThunderDay } from 'app/components/icons/weather/thunder/ThunderDay';
import { ThunderNight } from 'app/components/icons/weather/thunder/ThunderNight';
import { ThunderOutbreaksDay } from 'app/components/icons/weather/thunderoutbreaks/ThunderOutbreaksDay';
import { ThunderOutbreaksNight } from 'app/components/icons/weather/thunderoutbreaks/ThunderOutbreaksNight';
import React from 'react';

interface MapWeatherIconsProps {
	isDay: 0 | 1;
	code: number;
	width: number;
	height: number;
	strokeWidth?: number;
}

// SOLUTION: Store component references, not JSX elements
const dayIcons: Record<number, React.ComponentType<any>> = {
	1000: ClearDay,
	1003: PartCloudsDay,
	1006: CloudyDay,
	1009: OvercastDay,
	1030: FogDay,
	1063: RainDay,
	1066: Snow,
	1069: RainDay,
	1072: FreezingRainDay,
	1087: ThunderOutbreaksDay,
	1114: Snow,
	1117: Blizzard,
	1135: FogDay,
	1147: FreezingFogDay,
	1150: LightRainDay,
	1153: LightRainDay,
	1168: FreezingRainDay,
	1171: FreezingRainDay,
	1180: LightRainDay,
	1183: LightRainDay,
	1186: RainDay,
	1189: RainDay,
	1192: RainDay,
	1195: RainDay,
	1198: FreezingRainDay,
	1201: FreezingRainDay,
	1204: LightRainDay,
	1207: RainDay,
	1210: LightSnowDay,
	1213: LightSnowDay,
	1216: Snow,
	1219: Snow,
	1222: Snow,
	1225: Snow,
	1237: Snow,
	1240: LightRainDay,
	1243: RainDay,
	1246: RainDay,
	1249: FreezingRainDay,
	1252: FreezingRainDay,
	1255: LightSnowDay,
	1258: Snow,
	1261: FreezingRainDay,
	1264: FreezingRainDay,
	1273: ThunderDay,
	1276: ThunderDay,
	1279: FreezingThunderDay,
	1282: FreezingThunderDay,
};

const nightIcons: Record<number, React.ComponentType<any>> = {
	1000: ClearNight,
	1003: PartCloudsNight,
	1006: CloudyNight,
	1009: OvercastNight,
	1030: FogNight,
	1063: RainNight,
	1066: Snow,
	1069: RainNight,
	1072: FreezingRainNight,
	1087: ThunderOutbreaksNight,
	1114: Snow,
	1117: Blizzard,
	1135: FogNight,
	1147: FreezingFogNight,
	1150: LightRainNight,
	1153: LightRainNight,
	1168: FreezingRainNight,
	1171: FreezingRainNight,
	1180: LightRainNight,
	1183: LightRainNight,
	1186: RainNight,
	1189: RainNight,
	1192: RainNight,
	1195: RainNight,
	1198: FreezingRainNight,
	1201: FreezingRainNight,
	1204: LightRainNight,
	1207: RainNight,
	1210: LightSnowNight,
	1213: LightSnowNight,
	1216: Snow,
	1219: Snow,
	1222: Snow,
	1225: Snow,
	1237: Snow,
	1240: LightRainNight,
	1243: RainNight,
	1246: RainNight,
	1249: FreezingRainNight,
	1252: FreezingRainNight,
	1255: LightSnowNight,
	1258: Snow,
	1261: FreezingRainNight,
	1264: FreezingRainNight,
	1273: ThunderNight,
	1276: ThunderNight,
	1279: FreezingThunderNight,
	1282: FreezingThunderNight,
};

export const WeatherIcon = ({ isDay, code, width, height, strokeWidth }: MapWeatherIconsProps) => {
	const icons = isDay === 1 ? dayIcons : nightIcons;
	const IconComponent = icons[code] || OvercastDay; // Get component, not JSX element

	// SOLUTION: Render component directly so BaseIcon gets proper props for iOS shadows
	return <IconComponent width={width} height={height} strokeWidth={strokeWidth!} />;
};
