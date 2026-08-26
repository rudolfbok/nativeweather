'use client';

import { useStorageString } from 'app/database/useStorage';
import { useLayoutEffect } from 'react';

export const ThemeSync = () => {
	const [currentTheme] = useStorageString('currentTheme');
	const themeMode = currentTheme ?? 'system';

	useLayoutEffect(() => {
		if (themeMode === 'system') {
			const mq = window.matchMedia('(prefers-color-scheme: dark)');

			const sync = () => {
				document.documentElement.classList.toggle('dark', mq.matches);
			};

			sync();
			mq.addEventListener('change', sync);
			return () => mq.removeEventListener('change', sync);
		}

		document.documentElement.classList.toggle('dark', themeMode === 'dark');
	}, [themeMode]);

	return null;
};
