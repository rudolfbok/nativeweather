import { fetchAirQuality } from 'app/api/fetchAirQuality';
import { OpenMeteoAQI } from 'app/types/openMeteo';
import { CityCard } from 'app/types/cityCard';
import { create } from 'zustand';

interface LocalWeatherState {
	localWeatherData: CityCard;
	setLocalWeatherData: (data: CityCard) => Promise<void>;
	localAQIData: OpenMeteoAQI;
	setLocalAQIData: (data: OpenMeteoAQI) => void;
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
