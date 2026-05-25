'use client';

import { ThemeSync } from 'app/components/common/ui/ThemeSync.web';
import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { initStorageDefaults } from 'app/storage/initStorageDefaults';
import { initThemeFromStorage } from 'app/storage/initTheme';
import { Toaster } from 'burnt/web';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

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
			{children}
			<Toaster theme={NWTheme.colorScheme} position="bottom-right" />
		</TolgeeProvider>
	);
};
