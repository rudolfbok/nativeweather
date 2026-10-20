import { WeatherAPIMainIcon } from '../../../utils/mappings/weatherIcons';

interface MapWeatherIconsProps {
	code: number | null;
	isDay: 0 | 1;
	width: number;
	height: number;
	strokeWidth?: number;
}

export const WeatherIcon = ({ code, isDay, width, height, strokeWidth }: MapWeatherIconsProps) => (
	<WeatherAPIMainIcon code={code} isDay={isDay} width={width} height={height} strokeWidth={strokeWidth} />
);
