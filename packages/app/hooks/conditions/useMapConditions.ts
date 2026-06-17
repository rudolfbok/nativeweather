import { useWeatherAPIConditions } from './useWeatherAPIConditions';

export const useMapConditions = () => {
	const getWeatherAPICondition = useWeatherAPIConditions();

	const mapConditions = (code: number, isDay: 0 | 1, source: string): string => {
		if (source === 'weatherapi') {
			return getWeatherAPICondition(code, isDay);
		}
		throw new Error('Unknown weather source');
	};

	return mapConditions;
};
