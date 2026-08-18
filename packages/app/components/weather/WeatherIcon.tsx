import { WeatherAPIMainIcon } from 'app/utils/mappings/mapWeatherAPIIcons';

interface MapWeatherIconsProps {
	code: number;
	isDay: 0 | 1;
	width: number;
	height: number;
	strokeWidth?: number;
	source: string;
}

export const WeatherIcon = ({ code, isDay, width, height, strokeWidth, source }: MapWeatherIconsProps) => {
	if (source === 'weatherapi') {
		return <WeatherAPIMainIcon code={code} isDay={isDay} width={width} height={height} strokeWidth={strokeWidth} />;
	}
};
