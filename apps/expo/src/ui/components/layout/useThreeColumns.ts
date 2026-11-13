import { isTauri } from '@tauri-apps/api/core';
import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';

// The xl breakpoint (--breakpoint-xl in theme.css) as a media query, so the layout switches exactly where xl: classes do.
// Only the browser gets the third column; the Tauri window spends its width on the sidebar.
const wide = Platform.OS === 'web' && !isTauri() ? window.matchMedia('(width >= 104rem)') : undefined;

const subscribe = (onChange: () => void) => {
	wide?.addEventListener('change', onChange);
	return () => wide?.removeEventListener('change', onChange);
};

/** A wide browser window: the city page moves air quality and the metric cards into a third column. */
export const useThreeColumns = () => useSyncExternalStore(subscribe, () => wide?.matches ?? false);
