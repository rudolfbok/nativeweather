import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { fetchWeatherOrThrow } from '@nativeweather/api/fetchWeather';
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
import { useLocalWeather } from '@nativeweather/ui/hooks/weather/useLocalWeather';
import { useStorageBoolean, useStorageString } from '@nativeweather/core/database/useStorage';

export const useLocation = () => {
	const [currentSource] = useStorageString('currentSource');
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
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
			if (!currentSource) {
				throw new LocalWeatherError('source', 'No weather source is configured.');
			}
			const previousFailure = getLocationRequestFailure(currentSource);
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

			const result = await fetchWeatherOrThrow(`${coords.latitude},${coords.longitude}`, currentSource);

			await setLocalWeatherData(result);
			return result;
		} catch (caughtError) {
			const nextError = toLocalWeatherError(caughtError);
			if (isExpectedLocationError(nextError) && currentSource) {
				markLocationRequestFailed(currentSource, nextError.kind);
			}
			setError(nextError.kind);
			if (!isExpectedLocationError(nextError)) console.error('Local weather fetch failed:', caughtError);
			return null;
		} finally {
			isFetchingRef.current = false;
		}
	}, [currentSource, setLocalWeatherData]);

	return { getLocalWeather, error };
};
