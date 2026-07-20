import { create } from 'zustand';

type NavigationScreen = 'weather' | 'settings';

interface NavigationState {
	navigationScreen: NavigationScreen;
	setNavigationScreen: (screen: NavigationScreen) => void;
}

export const useNavigationScreen = create<NavigationState>((set) => ({
	navigationScreen: 'weather',
	setNavigationScreen: (screen) => set({ navigationScreen: screen }),
}));
