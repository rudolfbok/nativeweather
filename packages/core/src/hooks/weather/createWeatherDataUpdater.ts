import { fetchAirQuality } from '@nativeweather/api';
import type { NormalizedData, OpenMeteoAQI } from '@nativeweather/types';

interface WeatherData {
	weatherData: NormalizedData | null;
	airQualityData: OpenMeteoAQI | null;
}

const isSameLocation = (a: NormalizedData | null, b: NormalizedData) =>
	a?.location.lat === b.location.lat && a?.location.lon === b.location.lon;

export const createWeatherDataUpdater = (get: () => WeatherData, set: (state: Partial<WeatherData>) => void) => {
	let requestId = 0;

	return async (data: NormalizedData | null) => {
		const request = ++requestId;

		if (!data) {
			set({ weatherData: null, airQualityData: null });
			return;
		}

		set(isSameLocation(get().weatherData, data) ? { weatherData: data } : { weatherData: data, airQualityData: null });

		const airQuality = await fetchAirQuality(data.location.lat, data.location.lon);
		// A newer update may have landed while air quality was loading.
		if (airQuality && request === requestId && isSameLocation(get().weatherData, data)) {
			set({ airQualityData: airQuality });
		}
	};
};
