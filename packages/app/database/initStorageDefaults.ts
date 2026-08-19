import { storage } from './initStorage';

export const initStorageDefaults = () => {
	if (storage.getString('currentSource') === undefined) {
		storage.set('currentSource', 'weatherapi');
	}
	if (storage.getString('currentLang') === undefined) {
		storage.set('currentLang', 'en-US');
	}
	if (storage.getString('currentTheme') === undefined) {
		storage.set('currentTheme', 'system');
	}
	if (storage.getBoolean('showLocalWeather') === undefined) {
		storage.set('showLocalWeather', true);
	}
	if (storage.getBoolean('showWorldTime') === undefined) {
		storage.set('showWorldTime', true);
	}
	if (storage.getString('currentUnits') === undefined) {
		storage.set('currentUnits', 'metric');
	}
	if (storage.getString('currentTemp') === undefined) {
		storage.set('currentTemp', 'celsius');
	}
	if (storage.getString('currentAQI') === undefined) {
		storage.set('currentAQI', 'EU');
	}
};
