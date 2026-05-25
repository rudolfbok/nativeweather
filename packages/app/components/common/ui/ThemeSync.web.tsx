'use client';

import { useStorageString } from 'app/storage/useStorageString';
import { useEffect } from 'react';

export const ThemeSync = () => {
	const [currentTheme] = useStorageString('currentTheme');

	useEffect(() => {
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
