'use client';

import { ThemeSync } from '@nativeweather/ui/components/web/ThemeSync.web';
import { TolgeeProvider } from '@nativeweather/ui/provider/TolgeeProvider';
import { initStorageDefaults } from '@nativeweather/core/database/initStorageDefaults';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { Toaster } from 'burnt/web';
import { useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [currentTheme] = useStorageString('currentTheme');

	const typedTheme = currentTheme as ThemeMode;

	useEffect(() => {
		initStorageDefaults();
	}, []);


	return (
		<TolgeeProvider>
			<ThemeSync />
			{children}
			<Toaster theme={typedTheme} position="bottom-right" />
		</TolgeeProvider>
	);
};
