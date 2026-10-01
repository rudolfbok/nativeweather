import { useTranslate } from '@tolgee/react';
import { useMemo } from 'react';

export const useWeatherAPIConditions = () => {
	const { t } = useTranslate('weather');

	const conditions: Record<number, { day: string; night: string } | string> = useMemo(
		() => ({
			1000: {
				day: t('condition.clear.day'),
				night: t('condition.clear.night'),
			},
			1003: t('condition.partlycloudy'),
			1006: t('condition.cloudy'),
			1009: t('condition.overcast'),
			1030: t('condition.fog'),
			1036: t('condition.fog'),
			1063: t('condition.lightrain'),
			1066: t('condition.lightsnow'),
			1069: t('condition.lightrain'),
			1072: t('condition.freezingrain'),
			1087: t('condition.thunderstorm'),
			1114: t('condition.snow'),
			1117: t('condition.blizzard'),
			1135: t('condition.fog'),
			1147: t('condition.freezingfog'),
			1150: t('condition.lightrain'),
			1153: t('condition.lightrain'),
			1168: t('condition.lightrain'),
			1171: t('condition.lightrain'),
			1180: t('condition.lightrain'),
			1183: t('condition.lightrain'),
			1186: t('condition.rain'),
			1189: t('condition.rain'),
			1192: t('condition.rain'),
			1195: t('condition.rain'),
			1198: t('condition.lightrain'),
			1201: t('condition.freezingrain'),
			1204: t('condition.lightsnow'),
			1207: t('condition.snow'),
			1210: t('condition.lightsnow'),
			1213: t('condition.lightsnow'),
			1216: t('condition.snow'),
			1219: t('condition.snow'),
			1222: t('condition.snow'),
			1225: t('condition.snow'),
			1237: t('condition.snow'),
			1240: t('condition.thunderstorm'),
			1243: t('condition.thunderstorm'),
			1246: t('condition.thunderstorm'),
			1249: t('condition.thunderstorm'),
			1252: t('condition.thunderstorm'),
			1255: t('condition.thunderstorm'),
			1258: t('condition.thunderstorm'),
			1261: t('condition.thunderstorm'),
			1264: t('condition.thunderstorm'),
			1273: t('condition.thunderstorm'),
			1276: t('condition.thunderstorm'),
			1279: t('condition.thunderstorm'),
			1282: t('condition.thunderstorm'),
		}),
		[t]
	);

	const getWeatherAPICondition = (code: number, isDay: 0 | 1): string => {
		const condition = conditions[code];

		if (condition) {
			if (typeof condition === 'object') {
				return isDay === 1 ? condition.day : condition.night;
			}
			return condition;
		}

		return t('condition.overcast');
	};

	return getWeatherAPICondition;
};
