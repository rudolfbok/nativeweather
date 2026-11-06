import { initStorageDefaults, useStorageString } from '@/core';
import { availableLanguages, localeData } from '@/core/locales';
import { Toaster } from '@/ui';
import { FormatIcu } from '@tolgee/format-icu';
import { Tolgee, TolgeeProvider } from '@tolgee/react';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Uniwind, useCSSVariable, useUniwind } from 'uniwind';

type Language = (typeof availableLanguages)[number];
type ThemeSetting = 'system' | 'light' | 'dark';

const isLanguage = (value: string): value is Language => (availableLanguages as readonly string[]).includes(value);
const isThemeSetting = (value: string): value is ThemeSetting => ['system', 'light', 'dark'].includes(value);

const I18nProvider = ({ children }: { children: ReactNode }) => {
	const [storedLanguage] = useStorageString('currentLang');
	const language = isLanguage(storedLanguage) ? storedLanguage : 'en-US';
	const [tolgee] = useState(() =>
		// oxlint-disable-next-line react/capitalized-calls -- Tolgee exposes capitalized factory functions.
		Tolgee()
			// oxlint-disable-next-line react/capitalized-calls -- FormatIcu is a Tolgee factory function.
			.use(FormatIcu())
			.init({ language, availableLanguages: [...availableLanguages], staticData: localeData })
	);

	useEffect(() => {
		void tolgee.changeLanguage(language);
	}, [tolgee, language]);

	// Static data plus `ssr` makes Tolgee report itself loaded, so children render on the first pass.
	return (
		<TolgeeProvider tolgee={tolgee} ssr={{ language, staticData: localeData }}>
			{children}
		</TolgeeProvider>
	);
};

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
	const [storedTheme] = useStorageString('currentTheme');
	const { theme } = useUniwind();
	const [background, card, text, border, primary] = useCSSVariable([
		'--color-screen-background',
		'--color-card-background',
		'--color-label',
		'--color-hairline',
		'--color-primary-blue',
	]) as string[];

	useLayoutEffect(() => {
		Uniwind.setTheme(isThemeSetting(storedTheme) ? storedTheme : 'system');
	}, [storedTheme]);

	// React Navigation draws native headers and tab bars from this theme.
	const navigationTheme = useMemo(() => {
		const base = theme === 'dark' ? DarkTheme : DefaultTheme;
		return { ...base, colors: { ...base.colors, background, card, text, border, primary } };
	}, [theme, background, card, text, border, primary]);

	return <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>;
};

export const AppProviders = ({ children }: { children: ReactNode }) => {
	useEffect(initStorageDefaults, []);

	return (
		<I18nProvider>
			<AppThemeProvider>
				{children}
				<Toaster />
			</AppThemeProvider>
		</I18nProvider>
	);
};
