import { fetchWeather } from 'app/api/fetchWeather';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useStorageString } from 'app/storage/useStorage';
import { useCallback, useRef, useState } from 'react';

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

export const useLocation = () => {
	const [currentSource] = useStorageString('currentSource');
	const setLocalWeatherData = useLocalWeather((state) => state.setLocalWeatherData);
	const [error, setError] = useState<boolean>(false);
	const isFetchingRef = useRef(false);

	const getLocalWeather = useCallback(async () => {
		if (isFetchingRef.current) {
			return null;
		}

		isFetchingRef.current = true;
		setError(false);

		try {
			const position = await getCoordinates();
			if (!position || !currentSource) {
				setError(true);
				return null;
			}

			const { coords } = position;
			const result = await fetchWeather([coords.latitude, coords.longitude], currentSource);
			if (!result) {
				setError(true);
				return null;
			}

			await setLocalWeatherData(result);
			return result;
		} catch {
			setError(true);
			return null;
		} finally {
			isFetchingRef.current = false;
		}
	}, [currentSource, setLocalWeatherData]);

	return { getLocalWeather, error };
};
