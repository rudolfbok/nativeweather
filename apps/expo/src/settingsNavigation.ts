import type { SettingOptionKey } from '@/ui';
import { router } from 'expo-router';
import { Platform } from 'react-native';

// The web opens every setting as a modal over the page; native pushes a screen onto the settings stack.
export const openSettingOption = (option: SettingOptionKey) =>
	Platform.OS === 'web'
		? router.push({ pathname: '/modals/settings/[option]', params: { option } })
		: router.push({ pathname: '/settings/[option]', params: { option } });

export const openAbout = () => router.push(Platform.OS === 'web' ? '/modals/settings/about' : '/settings/about');

export const openFeedback = () =>
	router.push(Platform.OS === 'web' ? '/modals/settings/feedback' : '/settings/feedback');

export const openCompass = () => router.push('/modals/compass');
