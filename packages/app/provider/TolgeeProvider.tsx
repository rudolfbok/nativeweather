'use client';

import { Tolgee, TolgeeProvider as TolgeeReactProvider } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';
import CommonCS from 'app/locales/common/cs-CZ.json';
import CommonEN from 'app/locales/common/en-US.json';
import SummaryCS from 'app/locales/summary/cs-CZ.json';
import SummaryEN from 'app/locales/summary/en-US.json';
import WeatherCS from 'app/locales/weather/cs-CZ.json';
import WeatherEN from 'app/locales/weather/en-US.json';
import SettingsCS from 'app/locales/settings/cs-CZ.json';
import SettingsEN from 'app/locales/settings/en-US.json';
import { useStorageString } from 'app/storage/useStorageString';
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
				availableLanguages: ['en-US', 'cs-CZ'],
				staticData: {
					'en-US:common': CommonEN,
					'cs-CZ:common': CommonCS,
					'en-US:summary': SummaryEN,
					'cs-CZ:summary': SummaryCS,
					'en-US:weather': WeatherEN,
					'cs-CZ:weather': WeatherCS,
					'en-US:settings': SettingsEN,
					'cs-CZ:settings': SettingsCS
				}
			});
	}, [mounted, currentLang]);

	if (!mounted || !tolgee) {
		return null;
	}

	return <TolgeeReactProvider tolgee={tolgee}>{children}</TolgeeReactProvider>;
};
