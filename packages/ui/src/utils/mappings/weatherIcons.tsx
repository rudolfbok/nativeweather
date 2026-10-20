import { getWeatherCondition } from '@nativeweather/api/constants/weatherConditions';
import { Blizzard } from '../../components/icons/weather/blizzard/Blizzard';
import { ClearDay } from '../../components/icons/weather/clear/ClearDay';
import { ClearNight } from '../../components/icons/weather/clear/ClearNight';
import { CloudyDay } from '../../components/icons/weather/cloudy/CloudyDay';
import { CloudyNight } from '../../components/icons/weather/cloudy/CloudyNight';
import { FogDay } from '../../components/icons/weather/fog/FogDay';
import { FogNight } from '../../components/icons/weather/fog/FogNight';
import { FreezingFogDay } from '../../components/icons/weather/freezingfog/FreezingFogDay';
import { FreezingFogNight } from '../../components/icons/weather/freezingfog/FreezingFogNight';
import { FreezingRainDay } from '../../components/icons/weather/freezingrain/FreezingRainDay';
import { FreezingRainNight } from '../../components/icons/weather/freezingrain/FreezingRainNight';
import { LightRainDay } from '../../components/icons/weather/lightrain/LightRainDay';
import { LightRainNight } from '../../components/icons/weather/lightrain/LightRainNight';
import { LightSnowDay } from '../../components/icons/weather/lightsnow/LightSnowDay';
import { LightSnowNight } from '../../components/icons/weather/lightsnow/LightSnowNight';
import { OvercastDay } from '../../components/icons/weather/overcast/OvercastDay';
import { OvercastNight } from '../../components/icons/weather/overcast/OvercastNight';
import { PartCloudsDay } from '../../components/icons/weather/partclouds/PartCloudsDay';
import { PartCloudsNight } from '../../components/icons/weather/partclouds/PartCloudsNight';
import { RainDay } from '../../components/icons/weather/rain/RainDay';
import { RainNight } from '../../components/icons/weather/rain/RainNight';
import { Snow } from '../../components/icons/weather/snow/Snow';
import { StormDay } from '../../components/icons/weather/storm/StormDay';
import { StormNight } from '../../components/icons/weather/storm/StormNight';
import React from 'react';

const dayIcons = {
	clear: ClearDay,
	partclouds: PartCloudsDay,
	cloudy: CloudyDay,
	overcast: OvercastDay,
	fog: FogDay,
	obscured: FogDay,
	freezingfog: FreezingFogDay,
	lightrain: LightRainDay,
	freezingrain: FreezingRainDay,
	lightsnow: LightSnowDay,
	snow: Snow,
	blizzard: Blizzard,
	thunder: StormDay,
	rain: RainDay,
};
const nightIcons = {
	clear: ClearNight,
	partclouds: PartCloudsNight,
	cloudy: CloudyNight,
	overcast: OvercastNight,
	fog: FogNight,
	obscured: FogNight,
	freezingfog: FreezingFogNight,
	lightrain: LightRainNight,
	freezingrain: FreezingRainNight,
	lightsnow: LightSnowNight,
	snow: Snow,
	blizzard: Blizzard,
	thunder: StormNight,
	rain: RainNight,
};

interface WeatherAPIMainIconProps {
	isDay: 0 | 1;
	code: number | null;
	width: number;
	height: number;
	strokeWidth?: number;
}

export const WeatherAPIMainIcon = ({ isDay, code, width, height, strokeWidth }: WeatherAPIMainIconProps) => {
	const family = getWeatherCondition(code)?.icon;
	const icons = isDay === 1 ? dayIcons : nightIcons;
	const Icon = family ? icons[family] ?? icons.overcast : icons.overcast;
	return <Icon width={width} height={height} strokeWidth={strokeWidth ?? 1} />;
};
