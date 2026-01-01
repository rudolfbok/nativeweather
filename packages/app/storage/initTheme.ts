'use client';

import { colorScheme } from 'nativewind';
import { storage } from 'app/storage/storage';

export const initThemeFromStorage = () => {
	const savedTheme = (storage.getString('currentTheme') || 'system') as 'system' | 'light' | 'dark';
	colorScheme.set(savedTheme);
};
