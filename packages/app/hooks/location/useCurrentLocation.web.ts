import { fetchWeather } from 'app/api/fetchWeather';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useStorageString } from 'app/storage/useStorageString';
import { useState } from 'react';

const getCoordinates = (): Promise<GeolocationPosition | null> => {
	return new Promise((resolve) => {
		if (!navigator.geolocation) {
			return resolve(null);
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => resolve(pos),
			() => resolve(null),
			{
				enableHighAccuracy: false,
				timeout: 10_000,
				maximumAge: 60_000,
			}
		);
	});
};

export const useCurrentLocation = () => {
	const [currentSource] = useStorageString('currentSource');
	const { setLocalWeatherData } = useLocalWeather();
	const [error, setError] = useState<boolean>(false);

	void error;

	const getLocalWeather = async () => {
		setError(false);
		try {
			const { coords } = await getCoordinates();
			const result = await fetchWeather([coords.latitude, coords.longitude], currentSource);
			await setLocalWeatherData(result);
			return result;
		} catch (error) {
			setError(true);
		}
	};

	return { getLocalWeather, error };
};
