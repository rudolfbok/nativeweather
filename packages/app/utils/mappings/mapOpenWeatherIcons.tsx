import { ClearDay } from 'app/components/icons/weather/clear/ClearDay';
import { ClearNight } from 'app/components/icons/weather/clear/ClearNight';
import { PartCloudsDay } from 'app/components/icons/weather/partclouds/PartCloudsDay';
import { PartCloudsNight } from 'app/components/icons/weather/partclouds/PartCloudsNight';
import { CloudyDay } from 'app/components/icons/weather/cloudy/CloudyDay';
import { CloudyNight } from 'app/components/icons/weather/cloudy/CloudyNight';
import { RainDay } from 'app/components/icons/weather/rain/RainDay';
import { RainNight } from 'app/components/icons/weather/rain/RainNight';
import { Snow } from 'app/components/icons/weather/snow/Snow';
import { StormDay } from 'app/components/icons/weather/storm/StormDay';
import { StormNight } from 'app/components/icons/weather/storm/StormNight';
import { FogDay } from 'app/components/icons/weather/fog/FogDay';
import { FogNight } from 'app/components/icons/weather/fog/FogNight';
import React from 'react';
import { OvercastDay } from 'app/components/icons/weather/overcast/OvercastDay';
import { OvercastNight } from 'app/components/icons/weather/overcast/OvercastNight';
import { LightRainDay } from 'app/components/icons/weather/lightrain/LightRainDay';
import { FreezingRainDay } from 'app/components/icons/weather/freezingrain/FreezingRainDay';
import { LightRainNight } from 'app/components/icons/weather/lightrain/LightRainNight';
import { FreezingRainNight } from 'app/components/icons/weather/freezingrain/FreezingRainNight';

interface OpenWeatherMainIcon {
	isDay: 0 | 1;
	code: number;
	width: number;
	height: number;
	strokeWidth?: number;
}

const dayIcons: Record<number, React.ComponentType<any>> = {
	200: StormDay,
	201: StormDay,
	202: StormDay,
	210: StormDay,
	211: StormDay,
	212: StormDay,
	221: StormDay,
	230: StormDay,
	231: StormDay,
	232: StormDay,
	300: LightRainDay,
	301: LightRainDay,
	302: LightRainDay,
	310: LightRainDay,
	311: LightRainDay,
	312: LightRainDay,
	313: LightRainDay,
	314: LightRainDay,
	321: LightRainDay,
	500: RainDay,
	501: RainDay,
	502: RainDay,
	503: RainDay,
	504: RainDay,
	511: FreezingRainDay,
	520: LightRainDay,
	521: RainDay,
	522: RainDay,
	531: RainDay,
	600: Snow,
	601: Snow,
	602: Snow,
	611: Snow,
	612: Snow,
	613: Snow,
	615: Snow,
	616: Snow,
	620: Snow,
	621: Snow,
	622: Snow,
	701: FogDay,
	711: FogDay,
	721: FogDay,
	731: FogDay,
	741: FogDay,
	751: FogDay,
	761: FogDay,
	762: FogDay,
	771: FogDay,
	781: FogDay,
	800: ClearDay,
	801: PartCloudsDay,
	802: CloudyDay,
	803: OvercastDay,
	804: OvercastDay,
};

const nightIcons: Record<number, React.ComponentType<any>> = {
	200: StormNight,
	201: StormNight,
	202: StormNight,
	210: StormNight,
	211: StormNight,
	212: StormNight,
	221: StormNight,
	230: StormNight,
	231: StormNight,
	232: StormNight,
	300: LightRainNight,
	301: LightRainNight,
	302: LightRainNight,
	310: LightRainNight,
	311: LightRainNight,
	312: LightRainNight,
	313: LightRainNight,
	314: LightRainNight,
	321: LightRainNight,
	500: RainNight,
	501: RainNight,
	502: RainNight,
	503: RainNight,
	504: RainNight,
	511: FreezingRainNight,
	520: LightRainNight,
	521: RainNight,
	522: RainNight,
	531: RainNight,
	600: Snow,
	601: Snow,
	602: Snow,
	611: Snow,
	612: Snow,
	613: Snow,
	615: Snow,
	616: Snow,
	620: Snow,
	621: Snow,
	622: Snow,
	701: FogNight,
	711: FogNight,
	721: FogNight,
	731: FogNight,
	741: FogNight,
	751: FogNight,
	761: FogNight,
	762: FogNight,
	771: FogNight,
	781: FogNight,
	800: ClearNight,
	801: PartCloudsNight,
	802: CloudyNight,
	803: OvercastNight,
	804: OvercastNight,
};

export const OpenWeatherMainIcon = ({ isDay, code, width, height, strokeWidth }: OpenWeatherMainIcon) => {
	const icons = isDay === 1 ? dayIcons : nightIcons;
	const IconComponent = icons[code] || OvercastDay;

	return <IconComponent width={width} height={height} strokeWidth={strokeWidth!} />;
};
