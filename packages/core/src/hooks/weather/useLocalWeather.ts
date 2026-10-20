import type { NormalizedData } from '@nativeweather/types/normalizedData';
import type { OpenMeteoAQI } from '@nativeweather/types/openMeteo';
import { create } from 'zustand';
import { createWeatherDataUpdater } from './createWeatherDataUpdater';

interface LocalWeatherState {
	localWeatherData: NormalizedData | null;
	setLocalWeatherData: (data: NormalizedData | null) => Promise<void>;
	localAQIData: OpenMeteoAQI | null;
}

const updateWeatherData = createWeatherDataUpdater();

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
