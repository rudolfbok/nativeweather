'use client';

import { useStorageString } from 'app/storage/useStorage';
import { useEffect, useState } from 'react';

export const useSwitchColors = (light: string, dark: string) => {
	const [currentTheme] = useStorageString('currentTheme');
	const themeMode = currentTheme ?? 'system';
	const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

	useEffect(() => {
		if (themeMode === 'system') {
			const mq = window.matchMedia('(prefers-color-scheme: dark)');

			const sync = () => {
				setSystemDark(mq.matches);
			};

			sync();
			mq.addEventListener('change', sync);
			return () => mq.removeEventListener('change', sync);
		}
	}, [themeMode]);

	if (themeMode === 'dark' || (themeMode === 'system' && systemDark)) {
		return dark;
	}

	return light;
};
