// STUB(phase-6): minimal option table so persistence can be tested; slice 6.9 replaces it with the shared option list.
import { availableLanguages } from '@nativeweather/core/locales';

interface SettingOption {
	storageKey: string;
	/** Key in the `settings` namespace. */
	titleKey: string;
	/** [stored value, label key or null to show the value itself] */
	values: [string, string | null][];
}

export const settingOptions = {
	theme: {
		storageKey: 'currentTheme',
		titleKey: 'theme.title',
		values: [
			['system', 'theme.system'],
			['light', 'theme.light'],
			['dark', 'theme.dark'],
		],
	},
	language: {
		storageKey: 'currentLang',
		titleKey: 'language.title',
		values: availableLanguages.map((language) => [language, null]),
	},
	temperature: {
		storageKey: 'currentTemp',
		titleKey: 'temperature',
		values: [
			['celsius', 'temperatureScale.celsius'],
			['fahrenheit', 'temperatureScale.fahrenheit'],
		],
	},
	units: {
		storageKey: 'currentUnits',
		titleKey: 'units.title',
		values: [
			['metric', 'units.metric'],
			['imperial', 'units.imperial'],
		],
	},
	aqi: {
		storageKey: 'currentAQI',
		titleKey: 'airquality.title',
		values: [
			['EU', 'airquality.european'],
			['US', 'airquality.american'],
		],
	},
} satisfies Record<string, SettingOption>;

export type SettingOptionKey = keyof typeof settingOptions;

export const isSettingOptionKey = (value: string): value is SettingOptionKey => Object.hasOwn(settingOptions, value);
