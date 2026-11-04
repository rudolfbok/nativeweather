import { fetchAirQuality } from '@nativeweather/api';
import type { NormalizedData, OpenMeteoAQI } from '@nativeweather/types';

export const createWeatherUpdater = () => {
	let requestId = 0;

	return async (
		data: NormalizedData | null,
		getCurrent: () => NormalizedData | null,
		setWeather: (data: NormalizedData | null, clearAirQuality: boolean) => void,
		setAirQuality: (data: OpenMeteoAQI | null) => void
	) => {
		const request = ++requestId;
		const previous = getCurrent();

		if (!data) {
			setWeather(null, true);
			return;
		}

		const sameLocation = previous?.location.lat === data.location.lat && previous?.location.lon === data.location.lon;
		setWeather(data, !sameLocation);

		try {
			const airQuality = await fetchAirQuality(data.location.lat, data.location.lon);
			const current = getCurrent();
			if (
				airQuality &&
				request === requestId &&
				current?.location.lat === data.location.lat &&
				current?.location.lon === data.location.lon
			) {
				setAirQuality(airQuality);
			}
		} catch (error) {
			console.error('AQI fetch failed', error);
		}
	};
};
