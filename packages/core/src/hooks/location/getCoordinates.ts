import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { LocalWeatherError } from './locationError';

export const getCoordinates = async (): Promise<[number, number]> => {
	const { status } = await requestForegroundPermissionsAsync();
	if (status !== 'granted') throw new LocalWeatherError('permission', 'Location permission was denied.');

	let timeout: ReturnType<typeof setTimeout> | undefined;
	try {
		const { coords } = await Promise.race([
			getCurrentPositionAsync({ accuracy: Accuracy.Balanced }),
			new Promise<never>((_, reject) => {
				timeout = setTimeout(() => reject(new LocalWeatherError('timeout', 'Location request timed out.')), 15_000);
			}),
		]);
		return [coords.latitude, coords.longitude];
	} finally {
		clearTimeout(timeout);
	}
};
