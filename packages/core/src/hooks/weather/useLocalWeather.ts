import type { NormalizedData, OpenMeteoAQI } from '@nativeweather/types';
import { create } from 'zustand';
import { createWeatherUpdater } from './createWeatherUpdater';

interface LocalWeatherState {
	localWeatherData: NormalizedData | null;
	setLocalWeatherData: (data: NormalizedData | null) => Promise<void>;
	localAQIData: OpenMeteoAQI | null;
}

const updateWeatherData = createWeatherUpdater();

export const useLocalWeather = create<LocalWeatherState>((set, get) => ({
	localWeatherData: null,
	localAQIData: null,
	setLocalWeatherData: (data) =>
		updateWeatherData(
			data,
			() => get().localWeatherData,
			(localWeatherData, clear) =>
				set({
					localWeatherData,
					...(clear && { localAQIData: null }),
				}),
			(localAQIData) => set({ localAQIData })
		),
}));
