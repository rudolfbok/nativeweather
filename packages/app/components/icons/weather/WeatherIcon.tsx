import { WeatherAPIMainIcon } from 'app/utils/mappings/weatherIcons';

interface MapWeatherIconsProps {
	code: number;
	isDay: 0 | 1;
	width: number;
	height: number;
	strokeWidth?: number;
	source: string;
}

export const WeatherIcon = ({ code, isDay, width, height, strokeWidth }: MapWeatherIconsProps) => (
	<WeatherAPIMainIcon code={code} isDay={isDay} width={width} height={height} strokeWidth={strokeWidth} />
);
