import { create } from 'zustand';
import type { NormalizedData, OpenMeteoAQI } from '@nativeweather/types';
import { createWeatherUpdater } from './createWeatherUpdater';

interface WeatherState {
	weatherData: NormalizedData | null;
	airQualityData: OpenMeteoAQI | null;
	setWeatherData: (data: NormalizedData | null) => Promise<void>;
}

const updateWeatherData = createWeatherUpdater();

export const useWeather = create<WeatherState>((set, get) => ({
	weatherData: null,
	airQualityData: null,

	setWeatherData: (data) =>
		updateWeatherData(
			data,
			() => get().weatherData,
			(weatherData, clear) =>
				set({
					weatherData,
					...(clear && { airQualityData: null }),
				}),
			(airQualityData) => set({ airQualityData })
		),
}));
