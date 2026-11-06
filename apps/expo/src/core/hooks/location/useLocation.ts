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
import { getCoordinates } from './getCoordinates';
import { useLocalWeather } from '../weather/weatherStore';
import { useStorageBoolean } from '../../database/useStorage';

export const useLocation = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const [error, setError] = useState<LocalWeatherErrorKind | null>(null);
	const setLocalWeatherData = useLocalWeather((state) => state.setWeatherData);
	const isFetchingRef = useRef(false);

	useEffect(() => {
		if (!showLocalWeather) clearLocationRequestFailures();
	}, [showLocalWeather]);

	const getLocalWeather = useCallback(async () => {
		if (isFetchingRef.current) return null;

		isFetchingRef.current = true;
		setError(null);

		try {
			// Don't re-prompt after a denied or failed request until the user toggles local weather.
			const previousFailure = getLocationRequestFailure();
			if (previousFailure) {
				setError(previousFailure);
				return null;
			}

			const result = await fetchWeather(await getCoordinates());
			if (!result) throw new LocalWeatherError('network', 'Unable to load local weather.');

			await setLocalWeatherData(result);
			return result;
		} catch (caughtError) {
			const nextError = toLocalWeatherError(caughtError);
			setError(nextError.kind);
			if (isExpectedLocationError(nextError)) markLocationRequestFailed(nextError.kind);
			else console.error('Local weather fetch failed:', caughtError);
			return null;
		} finally {
			isFetchingRef.current = false;
		}
	}, [setLocalWeatherData]);

	return { getLocalWeather, error };
};
