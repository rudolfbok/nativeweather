'use client';

import { ThemeSync } from 'app/components/common/ui/ThemeSync.web';
import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { initStorageDefaults } from 'app/storage/initStorageDefaults';
import { useStorageString } from 'app/storage/useStorage';
import { Toaster } from 'burnt/web';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [currentTheme] = useStorageString('currentTheme');

	const typedTheme = currentTheme as ThemeMode;

	useEffect(() => {
		initStorageDefaults();
	}, []);

	const NWTheme = useColorScheme();

	return (
		<TolgeeProvider>
			<ThemeSync />
			{children}
			<Toaster theme={typedTheme} position="bottom-right" />
		</TolgeeProvider>
	);
};
