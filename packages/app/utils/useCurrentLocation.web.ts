import { fetchWeather } from 'app/api/fetchWeather';

type LocationError = 'not-supported' | 'permission-denied' | 'position-unavailable' | 'timeout' | 'unknown';

export const useLocalWeatherLocation = () => {
	const getWeather = () =>
		new Promise(async (resolve, reject: (reason: LocationError) => void) => {
			if (!navigator.geolocation) {
				reject('not-supported');
				return;
			}

			navigator.geolocation.getCurrentPosition(
				async ({ coords }) => {
					try {
						const result = await fetchWeather([coords.latitude, coords.longitude]);
						resolve(result);
					} catch {
						reject('unknown');
					}
				},
				(error) => {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							reject('permission-denied');
							break;
						case error.POSITION_UNAVAILABLE:
							reject('position-unavailable'); // ← tvůj kCLErrorLocationUnknown
							break;
						case error.TIMEOUT:
							reject('timeout');
							break;
						default:
							reject('unknown');
					}
				},
				{
					enableHighAccuracy: false,
					timeout: 10_000,
					maximumAge: 60_000,
				}
			);
		});

	return { getWeather };
};
