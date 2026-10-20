import { fetchWeatherOrThrow } from '@nativeweather/api/fetchWeather';
import { LocalWeatherError, toLocalWeatherError } from './locationError';
import type { LocalWeatherErrorKind } from './locationError';
import { useLocalWeather } from '@nativeweather/ui/hooks/weather/useLocalWeather';
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
			const position = await getCoordinates();

			const { coords } = position;
			const result = await fetchWeatherOrThrow([coords.latitude, coords.longitude]);

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
	}, [setLocalWeatherData]);

	return { getLocalWeather, error };
};
