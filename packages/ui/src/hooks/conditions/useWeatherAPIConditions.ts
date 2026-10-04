import { useTranslate } from '@tolgee/react';
import { normalizeWeatherConditionCode } from '@nativeweather/api/utils/weatherCondition';
import { getWeatherCondition } from '@nativeweather/core/constants/weatherConditions';

export const useWeatherAPIConditions = () => {
	const { t } = useTranslate('weather');

	return (code: number | null, isDay: 0 | 1): string => {
		const normalizedCode = normalizeWeatherConditionCode(code);
		const icon = getWeatherCondition(normalizedCode)?.icon;
		if (icon === 'clear') return t(`condition.clear.${isDay === 1 ? 'day' : 'night'}`);
		if (icon === 'partclouds') return t('condition.partlycloudy');
		if (icon === 'cloudy') return t('condition.cloudy');
		if (icon === 'overcast') return t('condition.overcast');
		if (icon === 'fog' || icon === 'obscured' || icon === 'freezingfog') return t('condition.fog');
		if (icon === 'lightrain') return t('condition.lightrain');
		if (icon === 'freezingrain') return t('condition.freezingrain');
		if (icon === 'lightsnow') return t('condition.lightsnow');
		if (icon === 'snow' || icon === 'blizzard') return t('condition.snow');
		if (icon === 'thunder') return t('condition.thunderstorm');

		return t('condition.rain');
	};
};
