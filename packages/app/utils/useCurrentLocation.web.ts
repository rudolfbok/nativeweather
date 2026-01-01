import { fetchWeather } from 'app/api/fetchWeather';

export const useLocalWeatherLocation = () => {
	const getWeather = () =>
		new Promise((resolve, reject) => {
			if (!('geolocation' in navigator)) {
				reject('not-supported');
				return;
			}

			navigator.geolocation.getCurrentPosition(
				async ({ coords }) => {
					const result = await fetchWeather([coords.latitude, coords.longitude]);
					resolve(result);
				},
				() => reject('permission'),
				{ enableHighAccuracy: false, timeout: 10_000 }
			);
		});

	return { getWeather };
};
