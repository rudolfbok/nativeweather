import { useWeatherAPIConditions } from './useWeatherAPIConditions';
import { useOpenWeatherConditions } from './useOpenWeatherConditions';

export const useMapConditions = () => {
	const getWeatherAPICondition = useWeatherAPIConditions();
	const getOpenWeatherCondition = useOpenWeatherConditions();

	const mapConditions = (code: number, isDay: 0 | 1, source: string): string => {
		if (source === 'weatherapi') {
			return getWeatherAPICondition(code, isDay);
		}
		if (source === 'openweather') {
			return getOpenWeatherCondition(code, isDay);
		}
		throw new Error('Unknown weather source');
	};

	return mapConditions;
};
