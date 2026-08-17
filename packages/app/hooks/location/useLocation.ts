import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { fetchWeather } from 'app/api/fetchWeather';
import { useCallback, useRef, useState } from 'react';
import { useLocalWeather } from 'app/hooks/weather/useLocalWeather';
import { useStorageString } from 'app/storage/useStorage';

export const useLocation = () => {
	const [currentSource] = useStorageString('currentSource');
	const [error, setError] = useState<boolean>(false);
	const setLocalWeatherData = useLocalWeather((state) => state.setLocalWeatherData);
	const isFetchingRef = useRef(false);

	const getLocalWeather = useCallback(async () => {
		if (isFetchingRef.current) {
			return null;
		}

		isFetchingRef.current = true;
		setError(false);

		try {
			if (!currentSource) {
				setError(true);
				return null;
			}

			const { status: authStatus } = await requestForegroundPermissionsAsync();
			if (authStatus !== 'granted') {
				setError(true);
				return null;
			}

			const { coords } = await getCurrentPositionAsync({
				accuracy: Accuracy.Balanced,
			});

			const result = await fetchWeather(`${coords.latitude},${coords.longitude}`, currentSource);
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
