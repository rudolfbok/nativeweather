import { create } from 'zustand';
import type { NormalizedData, OpenMeteoAQI } from '@nativeweather/types';
import { createWeatherDataUpdater } from './createWeatherDataUpdater';

interface WeatherState {
	weatherData: NormalizedData | null;
	airQualityData: OpenMeteoAQI | null;
	setWeatherData: (data: NormalizedData | null) => Promise<void>;
}

const createWeatherStore = () =>
	create<WeatherState>((set, get) => ({
		weatherData: null,
		airQualityData: null,
		setWeatherData: createWeatherDataUpdater(get, set),
	}));

export const useWeather = createWeatherStore();

export const useLocalWeather = createWeatherStore();
