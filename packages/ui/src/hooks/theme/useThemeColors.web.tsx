'use client';

import { useStorageString } from '@nativeweather/core/database/useStorage';
import { useEffect, useState } from 'react';
import { colors } from '@nativeweather/core/constants/colors';

export function useThemeColors() {
	const [currentTheme] = useStorageString('currentTheme');
	const themeMode = currentTheme ?? 'system';
	const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

	useEffect(() => {
		if (themeMode === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const sync = () => setSystemDark(mediaQuery.matches);

			sync();
			mediaQuery.addEventListener('change', sync);
			return () => mediaQuery.removeEventListener('change', sync);
		}
	}, [themeMode]);

	return colors[themeMode === 'dark' || (themeMode === 'system' && systemDark) ? 'dark' : 'light'];
}
