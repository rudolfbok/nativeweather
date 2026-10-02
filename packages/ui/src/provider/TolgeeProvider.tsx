'use client';

import { Tolgee, TolgeeProvider as TolgeeReactProvider } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';
import CommonCS from '@nativeweather/core/locales/common/cs-CZ.json';
import CommonEN from '@nativeweather/core/locales/common/en-US.json';
import CommonDE from '@nativeweather/core/locales/common/de-DE.json';
import CommonZH from '@nativeweather/core/locales/common/zh-CN.json';
import CommonJA from '@nativeweather/core/locales/common/ja-JP.json';
import CommonFR from '@nativeweather/core/locales/common/fr-FR.json';
import CommonIT from '@nativeweather/core/locales/common/it-IT.json';
import CommonPL from '@nativeweather/core/locales/common/pl-PL.json';
import SummaryCS from '@nativeweather/core/locales/summary/cs-CZ.json';
import SummaryEN from '@nativeweather/core/locales/summary/en-US.json';
import SummaryDE from '@nativeweather/core/locales/summary/de-DE.json';
import SummaryZH from '@nativeweather/core/locales/summary/zh-CN.json';
import SummaryJA from '@nativeweather/core/locales/summary/ja-JP.json';
import SummaryFR from '@nativeweather/core/locales/summary/fr-FR.json';
import SummaryIT from '@nativeweather/core/locales/summary/it-IT.json';
import SummaryPL from '@nativeweather/core/locales/summary/pl-PL.json';
import WeatherCS from '@nativeweather/core/locales/weather/cs-CZ.json';
import WeatherEN from '@nativeweather/core/locales/weather/en-US.json';
import WeatherDE from '@nativeweather/core/locales/weather/de-DE.json';
import WeatherZH from '@nativeweather/core/locales/weather/zh-CN.json';
import WeatherJA from '@nativeweather/core/locales/weather/ja-JP.json';
import WeatherFR from '@nativeweather/core/locales/weather/fr-FR.json';
import WeatherIT from '@nativeweather/core/locales/weather/it-IT.json';
import WeatherPL from '@nativeweather/core/locales/weather/pl-PL.json';
import SettingsCS from '@nativeweather/core/locales/settings/cs-CZ.json';
import SettingsEN from '@nativeweather/core/locales/settings/en-US.json';
import SettingsDE from '@nativeweather/core/locales/settings/de-DE.json';
import SettingsZH from '@nativeweather/core/locales/settings/zh-CN.json';
import SettingsJA from '@nativeweather/core/locales/settings/ja-JP.json';
import SettingsFR from '@nativeweather/core/locales/settings/fr-FR.json';
import SettingsIT from '@nativeweather/core/locales/settings/it-IT.json';
import SettingsPL from '@nativeweather/core/locales/settings/pl-PL.json';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { ReactNode, useMemo, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const TolgeeProvider = ({ children }: { children: ReactNode }) => {
	const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
	const [currentLang] = useStorageString('currentLang');

	const tolgee = useMemo(() => {
		if (!mounted) return null;

		// oxlint-disable-next-line react/capitalized-calls -- Tolgee exposes capitalized factory functions.
		return Tolgee()
			// oxlint-disable-next-line react/capitalized-calls -- FormatIcu is a Tolgee factory function.
			.use(FormatIcu())
			.init({
				language: currentLang || 'en-US',
				availableLanguages: ['en-US', 'cs-CZ', 'de-DE', 'zh-CN', 'ja-JP', 'fr-FR', 'it-IT', 'pl-PL'],
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
