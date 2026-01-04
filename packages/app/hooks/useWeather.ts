import { create } from 'zustand';
import { WeatherData } from 'app/types/weatherData';
import { AirQualityData } from 'app/types/airQualityData';
import { fetchAirQuality } from 'app/api/fetchAirQuality';

interface WeatherState {
	weatherData: WeatherData | null;
	airQualityData: AirQualityData | null;
	setWeatherData: (data: WeatherData | null) => void;
}

export const useWeather = create<WeatherState>((set, get) => ({
	weatherData: null,
	airQualityData: null,

	setWeatherData: async (data) => {
		const prev = get().weatherData;

		if (prev && data && prev.location.lat === data.location.lat && prev.location.lon === data.location.lon) {
			set({ weatherData: data });
			return;
		}

		set({
			weatherData: data,
			airQualityData: null,
		});

		if (!data) return;

		try {
			const aq = await fetchAirQuality(data.location.lat, data.location.lon);

			set({ airQualityData: aq });
		} catch (e) {
			console.error('AQI fetch failed', e);
		}
	},
}));
