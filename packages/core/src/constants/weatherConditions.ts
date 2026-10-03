export type ConditionIconFamily =
	| 'clear'
	| 'partclouds'
	| 'cloudy'
	| 'overcast'
	| 'fog'
	| 'obscured'
	| 'freezingfog'
	| 'lightrain'
	| 'freezingrain'
	| 'lightsnow'
	| 'snow'
	| 'blizzard'
	| 'thunder'
	| 'rain';
export type PrecipitationKind =
	'none' | 'rain' | 'snow' | 'sleet' | 'freezing' | 'ice' | 'thunder' | 'thunder_rain' | 'thunder_snow';
export type WeatherCondition = {
	icon: ConditionIconFamily;
	landscape: 'clear' | 'partclouds' | 'cloudy' | 'overcast' | 'fog' | 'rain' | 'snow' | 'thunder';
	precipitation: PrecipitationKind;
	thunder: boolean;
	freezing: boolean;
	possible: boolean;
};

// Canonical WeatherAPI condition IDs. Future source adapters map into these IDs before UI rendering.
export const weatherConditions: Record<number, WeatherCondition> = {
	1000: { icon: 'clear', landscape: 'clear', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1003: {
		icon: 'partclouds',
		landscape: 'partclouds',
		precipitation: 'none',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1006: {
		icon: 'cloudy',
		landscape: 'cloudy',
		precipitation: 'none',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1009: {
		icon: 'overcast',
		landscape: 'overcast',
		precipitation: 'none',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1012: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1015: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1018: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1021: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1024: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1027: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1030: { icon: 'fog', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1033: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1036: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1039: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1042: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1045: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1048: { icon: 'obscured', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1063: {
		icon: 'lightrain',
		landscape: 'rain',
		precipitation: 'rain',
		thunder: false,
		freezing: false,
		possible: true,
	},
	1066: {
		icon: 'lightsnow',
		landscape: 'snow',
		precipitation: 'snow',
		thunder: false,
		freezing: false,
		possible: true,
	},
	1069: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'sleet',
		thunder: false,
		freezing: true,
		possible: true,
	},
	1072: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'freezing',
		thunder: false,
		freezing: true,
		possible: true,
	},
	1087: {
		icon: 'thunder',
		landscape: 'thunder',
		precipitation: 'thunder',
		thunder: true,
		freezing: false,
		possible: true,
	},
	1114: { icon: 'snow', landscape: 'snow', precipitation: 'snow', thunder: false, freezing: false, possible: false },
	1117: {
		icon: 'blizzard',
		landscape: 'snow',
		precipitation: 'snow',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1135: { icon: 'fog', landscape: 'fog', precipitation: 'none', thunder: false, freezing: false, possible: false },
	1147: {
		icon: 'freezingfog',
		landscape: 'fog',
		precipitation: 'freezing',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1150: {
		icon: 'lightrain',
		landscape: 'rain',
		precipitation: 'rain',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1153: {
		icon: 'lightrain',
		landscape: 'rain',
		precipitation: 'rain',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1168: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'freezing',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1171: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'freezing',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1180: {
		icon: 'lightrain',
		landscape: 'rain',
		precipitation: 'rain',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1183: {
		icon: 'lightrain',
		landscape: 'rain',
		precipitation: 'rain',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1186: { icon: 'rain', landscape: 'rain', precipitation: 'rain', thunder: false, freezing: false, possible: false },
	1189: { icon: 'rain', landscape: 'rain', precipitation: 'rain', thunder: false, freezing: false, possible: false },
	1192: { icon: 'rain', landscape: 'rain', precipitation: 'rain', thunder: false, freezing: false, possible: false },
	1195: { icon: 'rain', landscape: 'rain', precipitation: 'rain', thunder: false, freezing: false, possible: false },
	1198: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'freezing',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1201: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'freezing',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1204: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'sleet',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1207: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'sleet',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1210: {
		icon: 'lightsnow',
		landscape: 'snow',
		precipitation: 'snow',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1213: {
		icon: 'lightsnow',
		landscape: 'snow',
		precipitation: 'snow',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1216: { icon: 'snow', landscape: 'snow', precipitation: 'snow', thunder: false, freezing: false, possible: false },
	1219: { icon: 'snow', landscape: 'snow', precipitation: 'snow', thunder: false, freezing: false, possible: false },
	1222: { icon: 'snow', landscape: 'snow', precipitation: 'snow', thunder: false, freezing: false, possible: false },
	1225: { icon: 'snow', landscape: 'snow', precipitation: 'snow', thunder: false, freezing: false, possible: false },
	1237: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'ice',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1240: {
		icon: 'lightrain',
		landscape: 'rain',
		precipitation: 'rain',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1243: { icon: 'rain', landscape: 'rain', precipitation: 'rain', thunder: false, freezing: false, possible: false },
	1246: { icon: 'rain', landscape: 'rain', precipitation: 'rain', thunder: false, freezing: false, possible: false },
	1249: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'sleet',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1252: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'sleet',
		thunder: false,
		freezing: true,
		possible: false,
	},
	1255: {
		icon: 'lightsnow',
		landscape: 'snow',
		precipitation: 'snow',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1258: { icon: 'snow', landscape: 'snow', precipitation: 'snow', thunder: false, freezing: false, possible: false },
	1261: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'ice',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1264: {
		icon: 'freezingrain',
		landscape: 'rain',
		precipitation: 'ice',
		thunder: false,
		freezing: false,
		possible: false,
	},
	1273: {
		icon: 'thunder',
		landscape: 'thunder',
		precipitation: 'thunder_rain',
		thunder: true,
		freezing: false,
		possible: false,
	},
	1276: {
		icon: 'thunder',
		landscape: 'thunder',
		precipitation: 'thunder_rain',
		thunder: true,
		freezing: false,
		possible: false,
	},
	1279: {
		icon: 'thunder',
		landscape: 'thunder',
		precipitation: 'thunder_snow',
		thunder: true,
		freezing: true,
		possible: false,
	},
	1282: {
		icon: 'thunder',
		landscape: 'thunder',
		precipitation: 'thunder_snow',
		thunder: true,
		freezing: true,
		possible: false,
	},
};

export const getWeatherCondition = (code: number | null | undefined): WeatherCondition | null =>
	code == null ? null : (weatherConditions[code] ?? null);
