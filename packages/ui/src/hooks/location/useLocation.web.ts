import { fetchWeatherOrThrow } from '@nativeweather/api/fetchWeather';
import { LocalWeatherError, toLocalWeatherError } from './locationError';
import type { LocalWeatherErrorKind } from './locationError';
import { useLocalWeather } from '@nativeweather/ui/hooks/weather/useLocalWeather';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { useCallback, useRef, useState } from 'react';

const positionErrorKinds: Record<number, LocalWeatherErrorKind> = {
	1: 'permission',
	3: 'timeout',
};

const getCoordinates = (): Promise<GeolocationPosition> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			return reject(new LocalWeatherError('unavailable', 'Geolocation is not available.'));
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => resolve(pos),
			(positionError) => {
				const kind = positionErrorKinds[positionError.code] ?? 'unavailable';
				reject(new LocalWeatherError(kind, positionError.message));
			},
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
	const { setLocalWeatherData } = useLocalWeather();
	const [error, setError] = useState<LocalWeatherErrorKind | null>(null);
	const isFetchingRef = useRef(false);

	const getLocalWeather = useCallback(async () => {
		if (isFetchingRef.current) {
			return null;
		}

		isFetchingRef.current = true;
		setError(null);

		try {
			if (!currentSource) throw new LocalWeatherError('source', 'No weather source is configured.');
			const position = await getCoordinates();

			const { coords } = position;
			const result = await fetchWeatherOrThrow([coords.latitude, coords.longitude], currentSource);

			await setLocalWeatherData(result);
			return result;
		} catch (caughtError) {
			const nextError = toLocalWeatherError(caughtError);
			setError(nextError.kind);
			console.error('Local weather fetch failed:', caughtError);
			return null;
		} finally {
			isFetchingRef.current = false;
		}
	}, [currentSource, setLocalWeatherData]);

	return { getLocalWeather, error };
};
