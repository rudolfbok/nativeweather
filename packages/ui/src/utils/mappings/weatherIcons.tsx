import { getWeatherCondition } from '@nativeweather/api';
import type { ConditionIconFamily } from '@nativeweather/api';
import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';
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

type IconComponent = ComponentType<SvgProps & { strokeWidth: number }>;

// [day, night]
const icons: Record<ConditionIconFamily, [IconComponent, IconComponent]> = {
	clear: [ClearDay, ClearNight],
	partclouds: [PartCloudsDay, PartCloudsNight],
	cloudy: [CloudyDay, CloudyNight],
	overcast: [OvercastDay, OvercastNight],
	fog: [FogDay, FogNight],
	obscured: [FogDay, FogNight],
	freezingfog: [FreezingFogDay, FreezingFogNight],
	lightrain: [LightRainDay, LightRainNight],
	freezingrain: [FreezingRainDay, FreezingRainNight],
	lightsnow: [LightSnowDay, LightSnowNight],
	snow: [Snow, Snow],
	blizzard: [Blizzard, Blizzard],
	thunder: [StormDay, StormNight],
	rain: [RainDay, RainNight],
};

interface WeatherIconProps {
	code: number;
	isDay: 0 | 1;
	size: number;
	strokeWidth?: number;
}

export const WeatherIcon = ({ code, isDay, size, strokeWidth = 1 }: WeatherIconProps) => {
	const Icon = icons[getWeatherCondition(code)?.icon ?? 'overcast'][isDay === 1 ? 0 : 1];
	return <Icon width={size} height={size} strokeWidth={strokeWidth} />;
};
