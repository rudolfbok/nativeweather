'use client';

import { ThemeSync } from '@nativeweather/ui/components/web/ThemeSync';
import { TolgeeProvider } from '@nativeweather/ui/provider/TolgeeProvider';
import { initStorageDefaults } from '@nativeweather/core/database/initStorageDefaults';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { Toaster } from '@nativeweather/ui/components/common/notifications/Toaster';
import { useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [currentTheme] = useStorageString('currentTheme');

	const typedTheme = (currentTheme ?? 'system') as ThemeMode;

	useEffect(() => {
		initStorageDefaults();
	}, []);

	return (
		<TolgeeProvider>
			<ThemeSync />
			{children}
			<Toaster theme={typedTheme} />
		</TolgeeProvider>
	);
};
