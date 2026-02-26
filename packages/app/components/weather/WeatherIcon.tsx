import { OpenWeatherMainIcon } from '../../utils/mappings/mapOpenWeatherIcons';
import { WeatherAPIMainIcon } from '../../utils/mappings/mapWeatherAPIIcons';

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
		return <WeatherAPIMainIcon code={code} isDay={isDay} width={width} height={height} strokeWidth={strokeWidth} />;
	}

	if (source === 'openweather') {
		return <OpenWeatherMainIcon code={code} isDay={isDay} width={width} height={height} strokeWidth={strokeWidth} />;
	}
};
