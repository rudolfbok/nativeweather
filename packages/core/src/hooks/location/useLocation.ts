import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { fetchWeather } from '@nativeweather/api';
import {
	clearLocationRequestFailures,
	getLocationRequestFailure,
	isExpectedLocationError,
	LocalWeatherError,
	markLocationRequestFailed,
	toLocalWeatherError,
} from './locationError';
import type { LocalWeatherErrorKind } from './locationError';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalWeather } from '../weather/useLocalWeather';
import { useStorageBoolean } from '../../database/useStorage';
import { booleanStorageDefaults } from '../../database/storageDefaults';

export const useLocation = () => {
	const [showLocalWeather = booleanStorageDefaults.showLocalWeather] = useStorageBoolean('showLocalWeather');
	const [error, setError] = useState<LocalWeatherErrorKind | null>(null);
	const { setLocalWeatherData } = useLocalWeather();
	const isFetchingRef = useRef(false);

	useEffect(() => {
		if (!showLocalWeather) clearLocationRequestFailures();
	}, [showLocalWeather]);

	const getLocalWeather = useCallback(async () => {
		if (isFetchingRef.current) {
			return null;
		}

		isFetchingRef.current = true;
		setError(null);

		try {
			const previousFailure = getLocationRequestFailure();
			if (previousFailure) {
				setError(previousFailure);
				return null;
			}

			const { status: authStatus } = await requestForegroundPermissionsAsync();
			if (authStatus !== 'granted') {
				throw new LocalWeatherError('permission', 'Location permission was denied.');
			}

			const { coords } = await Promise.race([
				getCurrentPositionAsync({ accuracy: Accuracy.Balanced }),
				new Promise<never>((_, reject) =>
					setTimeout(() => reject(new LocalWeatherError('timeout', 'Location request timed out.')), 15_000)
				),
			]);

			const result = await fetchWeather(`${coords.latitude},${coords.longitude}`);
			if (!result) throw new LocalWeatherError('network', 'Unable to load local weather.');

			await setLocalWeatherData(result);
			return result;
		} catch (caughtError) {
			const nextError = toLocalWeatherError(caughtError);
			if (isExpectedLocationError(nextError)) markLocationRequestFailed(nextError.kind);
			setError(nextError.kind);
			if (!isExpectedLocationError(nextError)) console.error('Local weather fetch failed:', caughtError);
			return null;
		} finally {
			isFetchingRef.current = false;
		}
	}, [setLocalWeatherData]);

	return { getLocalWeather, error };
};
