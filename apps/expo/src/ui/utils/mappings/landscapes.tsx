import { getLandscapeKey } from '@/core';
import type { LandscapeKey } from '@/core';
import type { ComponentType } from 'react';
import { ClearDayLandscape } from '../../components/landscapes/clear/ClearDay';
import { ClearNightLandscape } from '../../components/landscapes/clear/ClearNight';
import { FogDayLandscape } from '../../components/landscapes/fog/FogDay';
import { FogNightLandscape } from '../../components/landscapes/fog/FogNight';
import { LandscapeWrapper } from '../../components/landscapes/LandscapeWrapper';
import { OvercastDayLandscape } from '../../components/landscapes/overcast/OvercastDay';
import { OvercastNightLandscape } from '../../components/landscapes/overcast/OvercastNight';
import { PartCloudsDayLandscape } from '../../components/landscapes/partclouds/PartCloudsDay';
import { PartCloudsNightLandscape } from '../../components/landscapes/partclouds/PartCloudsNight';
import { RainDayLandscape } from '../../components/landscapes/rain/RainDay';
import { RainNightLandscape } from '../../components/landscapes/rain/RainNight';
import { SnowLandscape } from '../../components/landscapes/snow/Snow';
import { ThunderDayLandscape } from '../../components/landscapes/thunder/ThunderDay';
import { ThunderNightLandscape } from '../../components/landscapes/thunder/ThunderNight';

// [day, night]; cloudy shares the part-clouds art and snow draws both from one component.
type Landscape = ComponentType<{ isDay: 0 | 1 }>;

const landscapes: Record<LandscapeKey, [Landscape, Landscape]> = {
	clear: [ClearDayLandscape, ClearNightLandscape],
	partclouds: [PartCloudsDayLandscape, PartCloudsNightLandscape],
	cloudy: [PartCloudsDayLandscape, PartCloudsNightLandscape],
	overcast: [OvercastDayLandscape, OvercastNightLandscape],
	fog: [FogDayLandscape, FogNightLandscape],
	rain: [RainDayLandscape, RainNightLandscape],
	snow: [SnowLandscape, SnowLandscape],
	thunder: [ThunderDayLandscape, ThunderNightLandscape],
};

interface WeatherLandscapeProps {
	code: number;
	isDay: 0 | 1;
	width?: number;
	height?: number;
}

export const WeatherLandscape = ({ code, isDay, width, height }: WeatherLandscapeProps) => {
	const Landscape = landscapes[getLandscapeKey(code) ?? 'overcast'][isDay === 1 ? 0 : 1];

	return (
		<LandscapeWrapper width={width} height={height}>
			<Landscape isDay={isDay} />
		</LandscapeWrapper>
	);
};
