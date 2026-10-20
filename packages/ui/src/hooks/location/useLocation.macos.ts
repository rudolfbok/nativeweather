import { fetchWeatherOrThrow } from '@nativeweather/api/fetchWeather';
import { useStorageBoolean } from '@nativeweather/core/database/useStorage';
import { useLocalWeather } from '@nativeweather/ui/hooks/weather/useLocalWeather';
import type { LocalWeatherErrorKind } from './locationError';
import {
	clearLocationRequestFailures,
	getLocationRequestFailure,
	isExpectedLocationError,
	LocalWeatherError,
	markLocationRequestFailed,
	toLocalWeatherError,
} from './locationError';
import { NativeModules } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';

interface NativeLocation {
	getCurrentPosition: () => Promise<{ latitude: number; longitude: number }>;
}

const nativeLocation = NativeModules.NWLocation as NativeLocation | undefined;

export const useLocation = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const { setLocalWeatherData } = useLocalWeather();
	const [error, setError] = useState<LocalWeatherErrorKind | null>(null);
	const [locationReady, setLocationReady] = useState(false);
	const isFetchingRef = useRef(false);

	useEffect(() => {
		if (!showLocalWeather) clearLocationRequestFailures();
	}, [showLocalWeather]);

	const getLocalWeather = useCallback(async () => {
		if (isFetchingRef.current) return null;

		isFetchingRef.current = true;
		setError(null);
		setLocationReady(false);

		try {
			const previousFailure = getLocationRequestFailure();
			if (previousFailure) {
				setError(previousFailure);
				setLocationReady(true);
				return null;
			}
			if (!nativeLocation) throw new LocalWeatherError('unavailable', 'Location is not available on this Mac.');

			await setLocalWeatherData(null);
			const { latitude, longitude } = await nativeLocation.getCurrentPosition();
			setLocationReady(true);
			const result = await fetchWeatherOrThrow([latitude, longitude]);

			await setLocalWeatherData(result);
			return result;
		} catch (caughtError) {
			setLocationReady(true);
			const nativeErrorCode =
				typeof caughtError === 'object' && caughtError !== null && 'code' in caughtError
					? String(caughtError.code)
					: null;
			const nativeErrorKinds: Record<string, LocalWeatherErrorKind> = {
				permission: 'permission',
				unavailable: 'unavailable',
				timeout: 'timeout',
			};
			const nativeErrorKind = nativeErrorCode ? nativeErrorKinds[nativeErrorCode] : undefined;
			const nextError = nativeErrorKind
				? new LocalWeatherError(nativeErrorKind, String(caughtError))
				: toLocalWeatherError(caughtError);
			if (isExpectedLocationError(nextError)) markLocationRequestFailed(nextError.kind);
			setError(nextError.kind);
			if (!isExpectedLocationError(nextError)) console.error('Local weather fetch failed:', caughtError);
			return null;
		} finally {
			isFetchingRef.current = false;
		}
	}, [setLocalWeatherData]);

	return { getLocalWeather, error, locationReady };
};
