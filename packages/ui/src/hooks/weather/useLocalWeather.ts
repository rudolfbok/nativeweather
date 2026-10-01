import { fetchAirQuality } from '@nativeweather/api/fetchAirQuality';
import type { NormalizedData } from '@nativeweather/types/normalizedData';
import type { OpenMeteoAQI } from '@nativeweather/types/openMeteo';
import { create } from 'zustand';

interface LocalWeatherState {
	localWeatherData: NormalizedData | null;
	setLocalWeatherData: (data: NormalizedData | null) => Promise<void>;
	localAQIData: OpenMeteoAQI | null;
	setLocalAQIData: (data: OpenMeteoAQI | null) => void;
}

let airQualityRequest = 0;

export const useLocalWeather = create<LocalWeatherState>((set, get) => ({
	localWeatherData: null,
	localAQIData: null,
	setLocalAQIData: (data) => set({ localAQIData: data }),
	setLocalWeatherData: async (data) => {
		const prev = get().localWeatherData;
		const request = ++airQualityRequest;

		if (!data) {
			set({ localWeatherData: null, localAQIData: null });
			return;
		}

		const sameLocation = prev?.location.lat === data.location.lat && prev?.location.lon === data.location.lon;

		set(sameLocation ? { localWeatherData: data } : { localWeatherData: data, localAQIData: null });

		try {
			const aq = await fetchAirQuality(data.location.lat, data.location.lon);
			const current = get().localWeatherData;

			if (
				aq &&
				request === airQualityRequest &&
				current?.location.lat === data.location.lat &&
				current?.location.lon === data.location.lon
			) {
				set({ localAQIData: aq });
			}
		} catch (error) {
			console.error('Local AQI fetch failed', error);
		}
	},
}));
