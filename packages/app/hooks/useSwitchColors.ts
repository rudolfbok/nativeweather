import { useEffect, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { useStorageString } from 'app/storage/useStorage';

const getWebSystemTheme = () => {
	if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useSwitchColors = (light: string, dark: string): string => {
	const nativeTheme = useColorScheme();
	const [currentTheme] = useStorageString('currentTheme');
	const [webSystemTheme, setWebSystemTheme] = useState(getWebSystemTheme);

	useEffect(() => {
		if (Platform.OS !== 'web' || currentTheme !== 'system') return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const syncTheme = () => setWebSystemTheme(mediaQuery.matches ? 'dark' : 'light');

		syncTheme();
		mediaQuery.addEventListener('change', syncTheme);

		return () => mediaQuery.removeEventListener('change', syncTheme);
	}, [currentTheme]);

	const activeTheme =
		currentTheme === 'light' || currentTheme === 'dark'
			? currentTheme
			: Platform.OS === 'web'
				? webSystemTheme
				: nativeTheme;

	if (activeTheme === 'dark' || activeTheme === undefined) {
		return dark;
	}

	return light;
};
