import { useTranslate } from '@tolgee/react';
import { useMemo } from 'react';

export const useOpenWeatherConditions = () => {
	const { t } = useTranslate('weather');

	const conditions: Record<number, { day: string; night: string } | string> = useMemo(
		() => ({
			200: t('condition.thunderstorm'),
			201: t('condition.thunderstorm'),
			202: t('condition.thunderstorm'),
			210: t('condition.thunderstorm'),
			211: t('condition.thunderstorm'),
			212: t('condition.thunderstorm'),
			221: t('condition.thunderstorm'),
			230: t('condition.thunderstorm'),
			231: t('condition.thunderstorm'),
			232: t('condition.thunderstorm'),
			300: t('condition.lightrain'),
			301: t('condition.lightrain'),
			302: t('condition.lightrain'),
			310: t('condition.lightrain'),
			311: t('condition.lightrain'),
			312: t('condition.lightrain'),
			313: t('condition.lightrain'),
			314: t('condition.lightrain'),
			321: t('condition.lightrain'),
			500: t('condition.rain'),
			501: t('condition.rain'),
			502: t('condition.rain'),
			503: t('condition.rain'),
			504: t('condition.rain'),
			511: t('condition.freezingrain'),
			520: t('condition.lightrain'),
			521: t('condition.rain'),
			522: t('condition.rain'),
			531: t('condition.rain'),
			600: t('condition.snow'),
			601: t('condition.snow'),
			602: t('condition.snow'),
			611: t('condition.snow'),
			612: t('condition.snow'),
			613: t('condition.snow'),
			615: t('condition.snow'),
			616: t('condition.snow'),
			620: t('condition.snow'),
			621: t('condition.snow'),
			622: t('condition.snow'),
			701: t('condition.fog'),
			711: t('condition.fog'),
			721: t('condition.fog'),
			731: t('condition.fog'),
			741: t('condition.fog'),
			751: t('condition.fog'),
			761: t('condition.fog'),
			762: t('condition.fog'),
			771: t('condition.fog'),
			781: t('condition.fog'),
			800: {
				day: t('condition.clear.day'),
				night: t('condition.clear.night'),
			},
			801: t('condition.partlycloudy'),
			802: t('condition.cloudy'),
			803: t('condition.overcast'),
			804: t('condition.overcast'),
		}),
		[t]
	);

	const getOpenWeatherCondition = (code: number, isDay: 0 | 1): string => {
		const condition = conditions[code];

		if (condition) {
			if (typeof condition === 'object') {
				return isDay === 1 ? condition.day : condition.night;
			}
			return condition;
		}

		return '';
	};

	return getOpenWeatherCondition;
};
