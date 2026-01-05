'use client';

import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useStorageString } from 'app/storage/useStorageString';

export const ThemeSync = () => {
	const [currentTheme] = useStorageString('currentTheme');

	useEffect(() => {
		if (Platform.OS !== 'web') return;

		if (currentTheme === 'system') {
			const mq = window.matchMedia('(prefers-color-scheme: dark)');

			const sync = () => {
				document.documentElement.classList.toggle('dark', mq.matches);
			};

			sync();
			mq.addEventListener('change', sync);
			return () => mq.removeEventListener('change', sync);
		}

		document.documentElement.classList.toggle('dark', currentTheme === 'dark');
	}, [currentTheme]);

	return null;
};
