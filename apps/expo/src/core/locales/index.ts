import commonCS from './common/cs-CZ.json';
import commonDE from './common/de-DE.json';
import commonEN from './common/en-US.json';
import commonFR from './common/fr-FR.json';
import commonIT from './common/it-IT.json';
import commonPL from './common/pl-PL.json';
import commonZH from './common/zh-CN.json';
import settingsCS from './settings/cs-CZ.json';
import settingsDE from './settings/de-DE.json';
import settingsEN from './settings/en-US.json';
import settingsFR from './settings/fr-FR.json';
import settingsIT from './settings/it-IT.json';
import settingsPL from './settings/pl-PL.json';
import settingsZH from './settings/zh-CN.json';
import summaryCS from './summary/cs-CZ.json';
import summaryDE from './summary/de-DE.json';
import summaryEN from './summary/en-US.json';
import summaryFR from './summary/fr-FR.json';
import summaryIT from './summary/it-IT.json';
import summaryPL from './summary/pl-PL.json';
import summaryZH from './summary/zh-CN.json';
import weatherCS from './weather/cs-CZ.json';
import weatherDE from './weather/de-DE.json';
import weatherEN from './weather/en-US.json';
import weatherFR from './weather/fr-FR.json';
import weatherIT from './weather/it-IT.json';
import weatherPL from './weather/pl-PL.json';
import weatherZH from './weather/zh-CN.json';

export const availableLanguages = ['en-US', 'cs-CZ', 'de-DE', 'zh-CN', 'fr-FR', 'it-IT', 'pl-PL'] as const;

// Tolgee's language:namespace keys, exposed through the package barrel.
export const localeData = {
	'en-US:common': commonEN,
	'cs-CZ:common': commonCS,
	'de-DE:common': commonDE,
	'zh-CN:common': commonZH,
	'fr-FR:common': commonFR,
	'it-IT:common': commonIT,
	'pl-PL:common': commonPL,
	'en-US:settings': settingsEN,
	'cs-CZ:settings': settingsCS,
	'de-DE:settings': settingsDE,
	'zh-CN:settings': settingsZH,
	'fr-FR:settings': settingsFR,
	'it-IT:settings': settingsIT,
	'pl-PL:settings': settingsPL,
	'en-US:summary': summaryEN,
	'cs-CZ:summary': summaryCS,
	'de-DE:summary': summaryDE,
	'zh-CN:summary': summaryZH,
	'fr-FR:summary': summaryFR,
	'it-IT:summary': summaryIT,
	'pl-PL:summary': summaryPL,
	'en-US:weather': weatherEN,
	'cs-CZ:weather': weatherCS,
	'de-DE:weather': weatherDE,
	'zh-CN:weather': weatherZH,
	'fr-FR:weather': weatherFR,
	'it-IT:weather': weatherIT,
	'pl-PL:weather': weatherPL,
};
