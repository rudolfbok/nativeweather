import { getWeatherCondition } from '@nativeweather/core/constants/weatherConditions';
import { ClearDayLandscape } from '@nativeweather/ui/components/landscapes/clear/ClearDay';
import { ClearNightLandscape } from '@nativeweather/ui/components/landscapes/clear/ClearNight';
import { FogDayLandscape } from '@nativeweather/ui/components/landscapes/fog/FogDay';
import { FogNightLandscape } from '@nativeweather/ui/components/landscapes/fog/FogNight';
import { OvercastDayLandscape } from '@nativeweather/ui/components/landscapes/overcast/OvercastDay';
import { OvercastNightLandscape } from '@nativeweather/ui/components/landscapes/overcast/OvercastNight';
import { PartCloudsDayLandscape } from '@nativeweather/ui/components/landscapes/partclouds/PartCloudsDay';
import { PartCloudsNightLandscape } from '@nativeweather/ui/components/landscapes/partclouds/PartCloudsNight';
import { RainDayLandscape } from '@nativeweather/ui/components/landscapes/rain/RainDay';
import { RainNightLandscape } from '@nativeweather/ui/components/landscapes/rain/RainNight';
import { SnowLandscape } from '@nativeweather/ui/components/landscapes/snow/Snow';
import { ThunderDayLandscape } from '@nativeweather/ui/components/landscapes/thunder/ThunderDay';
import { ThunderNightLandscape } from '@nativeweather/ui/components/landscapes/thunder/ThunderNight';
import { LandscapeWrapper } from '@nativeweather/ui/components/landscapes/LandscapeWrapper';

const SnowDay = () => <SnowLandscape isDay={1} />;
const SnowNight = () => <SnowLandscape isDay={0} />;
const dayLandscapes = {
	clear: ClearDayLandscape,
	partclouds: PartCloudsDayLandscape,
	cloudy: PartCloudsDayLandscape,
	overcast: OvercastDayLandscape,
	fog: FogDayLandscape,
	rain: RainDayLandscape,
	snow: SnowDay,
	thunder: ThunderDayLandscape,
};
const nightLandscapes = {
	clear: ClearNightLandscape,
	partclouds: PartCloudsNightLandscape,
	cloudy: PartCloudsNightLandscape,
	overcast: OvercastNightLandscape,
	fog: FogNightLandscape,
	rain: RainNightLandscape,
	snow: SnowNight,
	thunder: ThunderNightLandscape,
};
export interface WeatherLandscapeProps {
	width?: number;
	height?: number;
}
export const WeatherLandscape = ({
	isDay,
	code,
	width,
	height,
}: { isDay: 0 | 1; code: number | null } & WeatherLandscapeProps) => {
	const family = getWeatherCondition(code)?.landscape;
	const Landscape = family
		? isDay === 1
			? dayLandscapes[family]
			: nightLandscapes[family]
		: isDay === 1
			? OvercastDayLandscape
			: OvercastNightLandscape;
	return (
		<LandscapeWrapper width={width} height={height}>
			<Landscape />
		</LandscapeWrapper>
	);
};
