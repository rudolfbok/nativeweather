import { isTauri } from '@tauri-apps/api/core';

export const stringStorageDefaults = {
	currentLang: 'en-US',
	currentTheme: 'system',
	currentUnits: 'metric',
	currentTemp: 'celsius',
	currentAQI: 'EU',
};

export const booleanStorageDefaults = {
	showLocalWeather: !isTauri(),
	showWorldTime: true,
};
