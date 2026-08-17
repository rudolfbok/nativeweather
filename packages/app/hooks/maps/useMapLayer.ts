import { create } from 'zustand';
import type { WeatherMapLayer } from 'app/constants/weatherMap';

interface LayerState {
	layer: WeatherMapLayer;
	setLayer: (layer: WeatherMapLayer) => void;
}

export const useMapLayer = create<LayerState>((set) => ({
	layer: 'tmp2m',
	setLayer: (layer) => set({ layer }),
}));
