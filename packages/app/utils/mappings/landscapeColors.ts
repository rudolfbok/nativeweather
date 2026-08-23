const dayLandscapesBg: Record<number, string> = {
	1000: '#49AADF',
	1003: '#54A0C9',
	1006: '#54A0C9',
	1009: '#7695A7',
	1030: '#92B1BF',
	1063: '#567D99',
	1066: '#81BCD9',
	1069: '#567D99',
	1072: '#567D99',
	1087: '#43607F',
	1114: '#81BCD9',
	1117: '#81BCD9',
	1135: '#92B1BF',
	1147: '#92B1BF',
	1150: '#567D99',
	1153: '#567D99',
	1168: '#567D99',
	1171: '#567D99',
	1180: '#567D99',
	1183: '#567D99',
	1186: '#567D99',
	1189: '#567D99',
	1192: '#567D99',
	1195: '#567D99',
	1198: '#567D99',
	1201: '#567D99',
	1204: '#567D99',
	1207: '#567D99',
	1210: '#81BCD9',
	1213: '#81BCD9',
	1216: '#81BCD9',
	1219: '#81BCD9',
	1222: '#81BCD9',
	1225: '#81BCD9',
	1237: '#81BCD9',
	1240: '#567D99',
	1243: '#567D99',
	1246: '#567D99',
	1249: '#567D99',
	1252: '#567D99',
	1255: '#81BCD9',
	1258: '#81BCD9',
	1261: '#567D99',
	1264: '#567D99',
	1273: '#43607F',
	1276: '#43607F',
	1279: '#43607F',
	1282: '#43607F',
};

const nightLandscapesBg: Record<number, string> = {
	1000: '#1A3861',
	1003: '#224067',
	1006: '#224067',
	1009: '#364E63',
	1030: '#3D5C71',
	1063: '#283F58',
	1066: '#81BCD9',
	1069: '#283F58',
	1072: '#283F58',
	1087: '#1D314E',
	1114: '#81BCD9',
	1117: '#81BCD9',
	1135: '#3D5C71',
	1147: '#3D5C71',
	1150: '#283F58',
	1153: '#283F58',
	1168: '#283F58',
	1171: '#283F58',
	1180: '#283F58',
	1183: '#283F58',
	1186: '#283F58',
	1189: '#283F58',
	1192: '#283F58',
	1195: '#283F58',
	1198: '#283F58',
	1201: '#283F58',
	1204: '#283F58',
	1207: '#283F58',
	1210: '#81BCD9',
	1213: '#81BCD9',
	1216: '#81BCD9',
	1219: '#81BCD9',
	1222: '#81BCD9',
	1225: '#81BCD9',
	1237: '#81BCD9',
	1240: '#283F58',
	1243: '#283F58',
	1246: '#283F58',
	1249: '#283F58',
	1252: '#283F58',
	1255: '#81BCD9',
	1258: '#81BCD9',
	1261: '#283F58',
	1264: '#283F58',
	1273: '#1D314E',
	1276: '#1D314E',
	1279: '#1D314E',
	1282: '#1D314E',
};

export const weatherLandscapeBg = ({ isDay, code }: { isDay: 0 | 1; code: number }) => {
	const landscapes = isDay === 1 ? dayLandscapesBg : nightLandscapesBg;
	const bgColor = landscapes[code] || '#7695A7';

	return bgColor;
};

export const weatherLandscapeText = ({ isDay, code }: { isDay: 0 | 1; code: number }) => {
	const color = weatherLandscapeBg({ isDay, code });
	const red = parseInt(color.slice(1, 3), 16) / 255;
	const green = parseInt(color.slice(3, 5), 16) / 255;
	const blue = parseInt(color.slice(5, 7), 16) / 255;
	const linearize = (value: number) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
	const luminance = linearize(red) * 0.2126 + linearize(green) * 0.7152 + linearize(blue) * 0.0722;

	return luminance > 0.179 ? '#111111' : '#FFFFFF';
};
