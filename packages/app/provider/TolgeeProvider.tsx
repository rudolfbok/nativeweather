'use client';

import { Tolgee, TolgeeProvider as TolgeeReactProvider } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';
import CommonCS from 'app/locales/common/cs-CZ.json';
import CommonEN from 'app/locales/common/en-US.json';
import CommonDE from 'app/locales/common/de-DE.json';
import CommonZH from 'app/locales/common/zh-CN.json';
import CommonJA from 'app/locales/common/ja-JP.json';
import CommonFR from 'app/locales/common/fr-FR.json';
import CommonIT from 'app/locales/common/it-IT.json';
import CommonPL from 'app/locales/common/pl-PL.json';
import SummaryCS from 'app/locales/summary/cs-CZ.json';
import SummaryEN from 'app/locales/summary/en-US.json';
import SummaryDE from 'app/locales/summary/de-DE.json';
import SummaryZH from 'app/locales/summary/zh-CN.json';
import SummaryJA from 'app/locales/summary/ja-JP.json';
import SummaryFR from 'app/locales/summary/fr-FR.json';
import SummaryIT from 'app/locales/summary/it-IT.json';
import SummaryPL from 'app/locales/summary/pl-PL.json';
import WeatherCS from 'app/locales/weather/cs-CZ.json';
import WeatherEN from 'app/locales/weather/en-US.json';
import WeatherDE from 'app/locales/weather/de-DE.json';
import WeatherZH from 'app/locales/weather/zh-CN.json';
import WeatherJA from 'app/locales/weather/ja-JP.json';
import WeatherFR from 'app/locales/weather/fr-FR.json';
import WeatherIT from 'app/locales/weather/it-IT.json';
import WeatherPL from 'app/locales/weather/pl-PL.json';
import SettingsCS from 'app/locales/settings/cs-CZ.json';
import SettingsEN from 'app/locales/settings/en-US.json';
import SettingsDE from 'app/locales/settings/de-DE.json';
import SettingsZH from 'app/locales/settings/zh-CN.json';
import SettingsJA from 'app/locales/settings/ja-JP.json';
import SettingsFR from 'app/locales/settings/fr-FR.json';
import SettingsIT from 'app/locales/settings/it-IT.json';
import SettingsPL from 'app/locales/settings/pl-PL.json';
import { useStorageString } from 'app/database/useStorage';
import { ReactNode, useEffect, useMemo, useState } from 'react';

export const TolgeeProvider = ({ children }: { children: ReactNode }) => {
	const [mounted, setMounted] = useState(false);
	const [currentLang] = useStorageString('currentLang');

	useEffect(() => {
		setMounted(true);
	}, []);

	const tolgee = useMemo(() => {
		if (!mounted) return null;

		return Tolgee()
			.use(FormatIcu())
			.init({
				language: currentLang || 'en-US',
				availableLanguages: [
					'en-US',
					'cs-CZ',
					'de-DE',
					'zh-CN',
					'ja-JP',
					'fr-FR',
					'it-IT',
					'pl-PL',
				],
				staticData: {
					'en-US:common': CommonEN,
					'de-DE:common': CommonDE,
					'zh-CN:common': CommonZH,
					'ja-JP:common': CommonJA,
					'fr-FR:common': CommonFR,
					'it-IT:common': CommonIT,
					'pl-PL:common': CommonPL,
					'cs-CZ:common': CommonCS,
					'en-US:summary': SummaryEN,
					'de-DE:summary': SummaryDE,
					'zh-CN:summary': SummaryZH,
					'ja-JP:summary': SummaryJA,
					'fr-FR:summary': SummaryFR,
					'it-IT:summary': SummaryIT,
					'pl-PL:summary': SummaryPL,
					'cs-CZ:summary': SummaryCS,
					'en-US:weather': WeatherEN,
					'de-DE:weather': WeatherDE,
					'zh-CN:weather': WeatherZH,
					'ja-JP:weather': WeatherJA,
					'fr-FR:weather': WeatherFR,
					'it-IT:weather': WeatherIT,
					'pl-PL:weather': WeatherPL,
					'cs-CZ:weather': WeatherCS,
					'en-US:settings': SettingsEN,
					'de-DE:settings': SettingsDE,
					'zh-CN:settings': SettingsZH,
					'ja-JP:settings': SettingsJA,
					'fr-FR:settings': SettingsFR,
					'it-IT:settings': SettingsIT,
					'pl-PL:settings': SettingsPL,
					'cs-CZ:settings': SettingsCS,
				},
			});
	}, [mounted, currentLang]);

	if (!mounted || !tolgee) {
		return null;
	}

	return <TolgeeReactProvider tolgee={tolgee}>{children}</TolgeeReactProvider>;
};
