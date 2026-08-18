import { create } from 'zustand';
import { NormalizedData } from 'app/types/normalizedData';
import { OpenMeteoAQI } from 'app/types/openMeteo';
import { fetchAirQuality } from 'app/api/fetchAirQuality';

interface WeatherState {
	weatherData: NormalizedData | null;
	airQualityData: OpenMeteoAQI | null;
	setWeatherData: (data: NormalizedData | null) => Promise<void>;
}

let airQualityRequest = 0;

export const useWeather = create<WeatherState>((set, get) => ({
	weatherData: null,
	airQualityData: null,

	setWeatherData: async (data) => {
		const prev = get().weatherData;
		const request = ++airQualityRequest;

		if (!data) {
			set({ weatherData: null, airQualityData: null });
			return;
		}

		const sameLocation =
			prev?.location.lat === data.location.lat && prev?.location.lon === data.location.lon;

		set(sameLocation ? { weatherData: data } : { weatherData: data, airQualityData: null });

		try {
			const aq = await fetchAirQuality(data.location.lat, data.location.lon);
			const current = get().weatherData;

			if (
				aq &&
				request === airQualityRequest &&
				current?.location.lat === data.location.lat &&
				current?.location.lon === data.location.lon
			) {
				set({ airQualityData: aq });
			}
		} catch (e) {
			console.error('AQI fetch failed', e);
		}
	},
}));
