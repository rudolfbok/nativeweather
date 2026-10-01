import { NormalizedData } from '@nativeweather/types/normalizedData';
import { create } from 'zustand';

type ForecastDay = NormalizedData['forecast']['forecastday'][0];

interface SelectedDayState {
	selectedDay: ForecastDay | null;
	setSelectedDay: (data: ForecastDay | null) => void;
}

export const useSelectedDay = create<SelectedDayState>((set) => ({
	selectedDay: null,
	setSelectedDay: (data) => set({ selectedDay: data }),
}));
