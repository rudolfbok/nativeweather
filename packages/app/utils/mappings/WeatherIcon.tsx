import { MapOpenWeatherIcons } from './mapOpenWeatherIcons';
import { MapWeatherAPIIcons } from './mapWeatherAPIIcons';

interface MapWeatherIconsProps {
	code: any;
	isDay: 0 | 1;
	width: number;
	height: number;
	strokeWidth?: number;
	source: string;
}

export const WeatherIcon = ({ code, isDay, width, height, strokeWidth, source }: MapWeatherIconsProps) => {
	if (source === 'weatherapi') {
		return <MapWeatherAPIIcons code={code} isDay={isDay} width={width} height={height} strokeWidth={strokeWidth} />;
	}

	if (source === 'openweather') {
		return <MapOpenWeatherIcons code={code} isDay={isDay} width={width} height={height} strokeWidth={strokeWidth} />;
	}
};
