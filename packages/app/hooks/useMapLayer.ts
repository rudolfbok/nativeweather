import { create } from 'zustand';

interface LayerState {
	layer: string;
	setLayer: (layer: string) => void;
}

export const useMapLayer = create<LayerState>((set) => ({
	layer: 'tmp2m',
	setLayer: (layer) => set({ layer }),
}));
