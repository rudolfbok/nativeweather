import { create } from 'zustand';

type NavigationScreen = 'weather' | 'settings' | 'testing';
export type ModalScreen =
	| 'airquality'
	| 'alerts'
	| 'clouds'
	| 'forecast'
	| 'humidity'
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
	setNavigationScreen: (screen: NavigationScreen) => void;
	setModalScreen: (screen: ModalScreen) => void;
}

export const useNavigationScreen = create<NavigationState>((set) => ({
	navigationScreen: 'weather',
	modalScreen: null,
	setNavigationScreen: (screen) => set({ navigationScreen: screen }),
	setModalScreen: (screen) => set({ modalScreen: screen }),
}));
