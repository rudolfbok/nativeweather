import { CityCardWeather } from 'app/types/cityCardWeather';
import { create } from 'zustand';

interface LocalWeatherState {
	localWeatherData: CityCardWeather | null;
	setLocalWeatherData: (data: CityCardWeather | null) => void;
}

export const useLocalWeather = create<LocalWeatherState>((set) => ({
	localWeatherData: null,
	setLocalWeatherData: (data) => set({ localWeatherData: data }),
}));
