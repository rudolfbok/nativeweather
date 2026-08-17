import { create } from 'zustand';

interface OpenDrawerState {
	openDrawer: boolean;
	setOpenDrawer: (data: boolean) => void;
}

export const useOpenDrawer = create<OpenDrawerState>((set) => ({
	openDrawer: false,
	setOpenDrawer: (data) => set({ openDrawer: data }),
}));
