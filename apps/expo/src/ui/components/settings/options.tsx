import { availableLanguages } from '@/core';
import { Languages, Moon, Paintbrush, Ruler, Sun, Thermometer } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { AirQualitySettingsIcon } from '../icons/settings/AirQualitySettingsIcon';
import { CelsiusIcon } from '../icons/settings/CelsiusIcon';
import { ChineseFlag } from '../icons/settings/ChineseFlag';
import { CzechFlag } from '../icons/settings/CzechFlag';
import { EnglishFlag } from '../icons/settings/EnglishFlag';
import { EUFLag } from '../icons/settings/EUFlag';
import { FahrenheitIcon } from '../icons/settings/FahrenheitIcon';
import { FrenchFlag } from '../icons/settings/FrenchFlag';
import { GermanFlag } from '../icons/settings/GermanFlag';
import { InchesIcon } from '../icons/settings/InchesIcon';
import { ItalianFlag } from '../icons/settings/ItalianFlag';
import { MillimetresIcon } from '../icons/settings/MillimetresIcon';
import { PolishFlag } from '../icons/settings/PolishFlag';
import { USAFlag } from '../icons/settings/USAFlag';
import { TileIcon } from './SettingsRow';

interface SettingValue {
	value: string;
	icon: ReactNode;
	/** Key in the `settings` namespace; without it the name is shown as is. */
	labelKey?: string;
	name?: string;
	/** Appended to the label on the choice page, e.g. the units it covers. */
	hint?: string;
}

interface SettingOption {
	storageKey: string;
	/** Key in the `settings` namespace. */
	titleKey: string;
	/** Title of the choice page, when it differs from the row's. */
	pageTitleKey?: string;
	tile: { icon: ReactNode; className: string };
	valueTileClassName: string;
	values: SettingValue[];
}

const blue = 'bg-primary-blue';
const flagTile = 'bg-tertiary-system-background';

// Language names stay in their own language.
const languages: Record<string, { name: string; flag: ReactNode }> = {
	'en-US': { name: 'English', flag: <EnglishFlag /> },
	'cs-CZ': { name: 'Čeština', flag: <CzechFlag /> },
	'de-DE': { name: 'Deutsch', flag: <GermanFlag /> },
	'pl-PL': { name: 'Polski', flag: <PolishFlag /> },
	'fr-FR': { name: 'Français', flag: <FrenchFlag /> },
	'it-IT': { name: 'Italiano', flag: <ItalianFlag /> },
	'zh-CN': { name: '简体中文', flag: <ChineseFlag /> },
};

export const settingOptions = {
	theme: {
		storageKey: 'currentTheme',
		titleKey: 'theme.title',
		tile: { icon: <TileIcon icon={Paintbrush} />, className: blue },
		valueTileClassName: blue,
		values: [
			{ value: 'light', labelKey: 'theme.light', icon: <TileIcon icon={Sun} /> },
			{ value: 'dark', labelKey: 'theme.dark', icon: <TileIcon icon={Moon} /> },
			{ value: 'system', labelKey: 'theme.system', icon: <TileIcon icon={Paintbrush} /> },
		],
	},
	language: {
		storageKey: 'currentLang',
		titleKey: 'language.title',
		tile: { icon: <TileIcon icon={Languages} />, className: 'bg-system-purple' },
		valueTileClassName: flagTile,
		values: availableLanguages.map((value) => ({
			value,
			name: languages[value]?.name ?? value,
			icon: languages[value]?.flag,
		})),
	},
	temperature: {
		storageKey: 'currentTemp',
		titleKey: 'temperature',
		tile: { icon: <TileIcon icon={Thermometer} />, className: 'bg-system-orange' },
		valueTileClassName: blue,
		values: [
			{ value: 'celsius', labelKey: 'temperatureScale.celsius', icon: <CelsiusIcon /> },
			{ value: 'fahrenheit', labelKey: 'temperatureScale.fahrenheit', icon: <FahrenheitIcon /> },
		],
	},
	units: {
		storageKey: 'currentUnits',
		titleKey: 'units.title',
		tile: { icon: <TileIcon icon={Ruler} />, className: 'bg-system-teal' },
		valueTileClassName: blue,
		values: [
			{ value: 'metric', labelKey: 'units.metric', icon: <MillimetresIcon />, hint: ' - mm, km, kPa' },
			{ value: 'imperial', labelKey: 'units.imperial', icon: <InchesIcon />, hint: ' - in, mil, inHg' },
		],
	},
	aqi: {
		storageKey: 'currentAQI',
		titleKey: 'airquality.title',
		pageTitleKey: 'airquality.titlefull',
		tile: { icon: <AirQualitySettingsIcon />, className: blue },
		valueTileClassName: flagTile,
		values: [
			{ value: 'EU', labelKey: 'airquality.european', icon: <EUFLag /> },
			{ value: 'US', labelKey: 'airquality.american', icon: <USAFlag /> },
		],
	},
} satisfies Record<string, SettingOption>;

export type SettingOptionKey = keyof typeof settingOptions;

/** An option widened to its declared shape, so optional fields can be read from any of them. */
export const getSettingOption = (option: SettingOptionKey): SettingOption => settingOptions[option];

export const isSettingOptionKey = (value: string): value is SettingOptionKey => Object.hasOwn(settingOptions, value);

export const optionLabel = (t: (key: string) => string, { labelKey, name }: SettingValue) =>
	labelKey ? t(labelKey) : (name ?? '');
