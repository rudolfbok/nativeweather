'use client';

import { Header } from 'app/components/common/Header.web';
import { ThemeSync } from 'app/components/common/ThemeSync.web';
import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { initStorageDefaults } from 'app/storage/initStorageDefaults';
import { initThemeFromStorage } from 'app/storage/initTheme';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Toaster } from 'burnt/web';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		initThemeFromStorage();
	}, []);
	useEffect(() => {
		initStorageDefaults();
	}, []);
	const NWTheme = useColorScheme();

	return (
		<TolgeeProvider>
			<ThemeSync />
			<Header />
			{children}
			<Toaster theme={NWTheme.colorScheme} position="bottom-right" />
		</TolgeeProvider>
	);
};
