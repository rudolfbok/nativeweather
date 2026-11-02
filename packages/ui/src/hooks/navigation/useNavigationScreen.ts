import { create } from 'zustand';

type NavigationScreen = 'weather' | 'search' | 'settings' | 'testing';
export type SettingsModalScreen =
	| 'theme'
	| 'language'
	| 'temperature'
	| 'units'
	| 'settings-aqi'
	| 'about'
	| 'feedback';
export type ModalScreen =
	| SettingsModalScreen
	| 'airquality'
	| 'alerts'
	| 'clouds'
	| 'forecast'
	| 'humidity'
	| 'maps'
	| 'moon'
	| 'pressure'
	| 'rain'
	| 'range'
	| 'snow'
	| 'sunrise'
	| 'sunset'
	| 'uv'
	| 'wind'
	| null;

interface NavigationState {
	navigationScreen: NavigationScreen;
	modalScreen: ModalScreen;
	modalDate?: string;
	setNavigationScreen: (screen: NavigationScreen) => void;
	setModalScreen: (screen: ModalScreen, date?: string) => void;
}

export const useNavigationScreen = create<NavigationState>(() => ({
	navigationScreen: 'weather',
	modalScreen: null,
	setNavigationScreen: () => undefined,
	setModalScreen: () => undefined,
}));
