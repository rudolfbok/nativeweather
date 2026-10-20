'use client';

import { colorScheme } from 'nativewind';
import { Platform } from 'react-native';
import { storage } from '@nativeweather/core/database/initStorage';

export const initThemeFromStorage = () => {
	if (Platform.OS === 'web') return;

	const savedTheme = (storage.getString('currentTheme') || 'system') as 'system' | 'light' | 'dark';
	colorScheme.set(savedTheme);
};
