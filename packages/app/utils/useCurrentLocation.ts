import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { fetchWeather } from 'app/api/fetchWeather';

export const useLocalWeatherLocation = () => {
	const getWeather = async () => {
		const { status } = await requestForegroundPermissionsAsync();
		if (status !== 'granted') throw new Error('permission');

		const { coords } = await getCurrentPositionAsync({
			accuracy: Accuracy.Balanced,
		});

		return fetchWeather(`${coords.latitude},${coords.longitude}`);
	};

	return { getWeather };
};
