import { getWeatherCondition } from '@nativeweather/core/constants/weatherConditions';

export const normalizeWeatherConditionCode = (code: unknown): number => {
	if (typeof code === 'number' || (typeof code === 'string' && code.trim() !== '')) {
		const numericCode = Number(code);
		if (Number.isSafeInteger(numericCode) && getWeatherCondition(numericCode)) return numericCode;
	}
	return 1009;
};
