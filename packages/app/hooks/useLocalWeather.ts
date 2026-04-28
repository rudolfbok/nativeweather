import { fetchAirQuality } from 'app/api/fetchAirQuality';
import { AirQualityData } from 'app/types/airQualityData';
import { CityCardWeather } from 'app/types/cityCardWeather';
import { create } from 'zustand';

interface LocalWeatherState {
	localWeatherData: CityCardWeather | null;
	setLocalWeatherData: (data: CityCardWeather | null) => Promise<void>;
	localAQIData: AirQualityData | null;
	setLocalAQIData: (data: AirQualityData | null) => void;
}

export const useLocalWeather = create<LocalWeatherState>((set, get) => ({
	localWeatherData: null,
	localAQIData: null,
	setLocalAQIData: (data) => set({ localAQIData: data }),
	setLocalWeatherData: async (data) => {
		const prev = get().localWeatherData;

		if (prev && data && prev.location.lat === data.location.lat && prev.location.lon === data.location.lon) {
			set({ localWeatherData: data });
			return;
		}

		set({
			localWeatherData: data,
			localAQIData: null,
		});

		if (!data) return;

		try {
			const aq = await fetchAirQuality(data.location.lat, data.location.lon);

			set({ localAQIData: aq });
		} catch (error) {
			console.error('Local AQI fetch failed', error);
		}
	},
}));
