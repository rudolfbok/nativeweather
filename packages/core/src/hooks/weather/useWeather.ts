import { create } from 'zustand';
import type { NormalizedData } from '@nativeweather/types/normalizedData';
import type { OpenMeteoAQI } from '@nativeweather/types/openMeteo';
import { createWeatherDataUpdater } from './createWeatherDataUpdater';

interface WeatherState {
	weatherData: NormalizedData | null;
	airQualityData: OpenMeteoAQI | null;
	setWeatherData: (data: NormalizedData | null) => Promise<void>;
}

const updateWeatherData = createWeatherDataUpdater();

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
