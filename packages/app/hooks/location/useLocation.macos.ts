import { fetchWeatherOrThrow } from 'app/api/fetchWeather';
import { useStorageString } from 'app/database/useStorage';
import { useLocalWeather } from 'app/hooks/weather/useLocalWeather';
import type { LocalWeatherErrorKind } from './locationError';
import { LocalWeatherError, toLocalWeatherError } from './locationError';
import { NativeModules } from 'react-native';
import { useCallback, useRef, useState } from 'react';

interface NativeLocation {
	getCurrentPosition: () => Promise<{ latitude: number; longitude: number }>;
}

const nativeLocation = NativeModules.NWLocation as NativeLocation | undefined;

export const useLocation = () => {
	const [currentSource] = useStorageString('currentSource');
	const { setLocalWeatherData } = useLocalWeather();
	const [error, setError] = useState<LocalWeatherErrorKind | null>(null);
	const [locationReady, setLocationReady] = useState(false);
	const isFetchingRef = useRef(false);

	const getLocalWeather = useCallback(async () => {
		if (isFetchingRef.current) return null;

		isFetchingRef.current = true;
		setError(null);
		setLocationReady(false);

		try {
			if (!currentSource) throw new LocalWeatherError('source', 'No weather source is configured.');
			if (!nativeLocation) throw new LocalWeatherError('unavailable', 'Location is not available on this Mac.');

			await setLocalWeatherData(null);
			const { latitude, longitude } = await nativeLocation.getCurrentPosition();
			setLocationReady(true);
			const result = await fetchWeatherOrThrow([latitude, longitude], currentSource);

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
			setError(nextError.kind);
			console.error('Local weather fetch failed:', caughtError);
			return null;
		} finally {
			isFetchingRef.current = false;
		}
	}, [currentSource, setLocalWeatherData]);

	return { getLocalWeather, error, locationReady };
};
