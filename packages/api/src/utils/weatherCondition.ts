const supportedWeatherConditionCodes = new Set([
	1000, 1003, 1006, 1009, 1030, 1036, 1063, 1066, 1069, 1072, 1087, 1114, 1117, 1135, 1147, 1150, 1153, 1168,
	1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225,
	1237, 1240, 1243, 1246, 1249, 1252, 1255, 1258, 1261, 1264, 1273, 1276, 1279, 1282,
]);

export const normalizeWeatherConditionCode = (code: unknown) => {
	if (typeof code !== 'number' && typeof code !== 'string') return 1009;

	const numericCode = Number(code);
	if (!supportedWeatherConditionCodes.has(numericCode)) return 1009;

	return numericCode;
};
