import { useTranslate } from '@tolgee/react';
import { useMemo } from 'react';

export const useWeatherConditions = () => {
	const { t } = useTranslate('weather');

	const conditions: Record<number, { day: string; night: string } | string> = useMemo(
		() => ({
			1000: {
				day: t('condition.1000.day'),
				night: t('condition.1000.night'),
			},
			1003: t('condition.1003'),
			1006: t('condition.1006'),
			1009: t('condition.1009'),
			1030: t('condition.1030'),
			1063: t('condition.1063'),
			1066: t('condition.1066'),
			1069: t('condition.1069'),
			1072: t('condition.1072'),
			1087: t('condition.1087'),
			1114: t('condition.1114'),
			1117: t('condition.1117'),
			1135: t('condition.1135'),
			1147: t('condition.1147'),
			1150: t('condition.1150'),
			1153: t('condition.1153'),
			1168: t('condition.1168'),
			1171: t('condition.1171'),
			1180: t('condition.1180'),
			1183: t('condition.1183'),
			1186: t('condition.1186'),
			1189: t('condition.1189'),
			1192: t('condition.1192'),
			1195: t('condition.1195'),
			1198: t('condition.1198'),
			1201: t('condition.1201'),
			1204: t('condition.1204'),
			1207: t('condition.1207'),
			1210: t('condition.1210'),
			1213: t('condition.1213'),
			1216: t('condition.1216'),
			1219: t('condition.1219'),
			1222: t('condition.1222'),
			1225: t('condition.1225'),
			1237: t('condition.1237'),
			1240: t('condition.1240'),
			1243: t('condition.1243'),
			1246: t('condition.1246'),
			1249: t('condition.1249'),
			1252: t('condition.1252'),
			1255: t('condition.1255'),
			1258: t('condition.1258'),
			1261: t('condition.1261'),
			1264: t('condition.1264'),
			1273: t('condition.1273'),
			1276: t('condition.1276'),
			1279: t('condition.1279'),
			1282: t('condition.1282'),
		}),
		[t]
	);

	const getWeatherByCode = (code: number, is_day: 0 | 1): string => {
		const condition = conditions[code];

		if (condition) {
			if (typeof condition === 'object') {
				return is_day === 1 ? condition.day : condition.night;
			}
			return condition;
		}

		return '';
	};

	return getWeatherByCode;
};
