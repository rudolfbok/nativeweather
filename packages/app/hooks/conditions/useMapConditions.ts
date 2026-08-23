import { useWeatherAPIConditions } from './useWeatherAPIConditions';

export const useMapConditions = () => {
	const getWeatherAPICondition = useWeatherAPIConditions();

	const mapConditions = (code: number, isDay: 0 | 1, _source: string): string =>
		getWeatherAPICondition(code, isDay);

	return mapConditions;
};
