import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { fetchWeather } from 'app/api/fetchWeather';
import { useState } from 'react';
import { useLocalWeather } from './useLocalWeather';

export const useCurrentLocation = () => {
	const { setLocalWeatherData } = useLocalWeather();
	const [error, setError] = useState<boolean>(false);

	void error;

	const getLocalWeather = async () => {
		setError(false);

		try {
			const { status: authStatus } = await requestForegroundPermissionsAsync();
			if (authStatus !== 'granted') {
				setError(true);
			}

			const { coords } = await getCurrentPositionAsync({
				accuracy: Accuracy.Balanced,
			});

			const result = await fetchWeather(`${coords.latitude},${coords.longitude}`);
			setLocalWeatherData(result);
		} catch (error) {
			setError(true);
		}
	};

	return { getLocalWeather, error };
};
