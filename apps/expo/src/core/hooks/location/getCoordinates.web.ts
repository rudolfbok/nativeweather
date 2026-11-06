import { LocalWeatherError } from './locationError';
import type { LocalWeatherErrorKind } from './locationError';

const positionErrorKinds: Record<number, LocalWeatherErrorKind> = {
	1: 'permission',
	3: 'timeout',
};

export const getCoordinates = (): Promise<[number, number]> =>
	new Promise((resolve, reject) => {
		if (typeof navigator === 'undefined' || !navigator.geolocation) {
			return reject(new LocalWeatherError('unavailable', 'Geolocation is not available.'));
		}

		navigator.geolocation.getCurrentPosition(
			({ coords }) => resolve([coords.latitude, coords.longitude]),
			(positionError) => {
				const kind = positionErrorKinds[positionError.code] ?? 'unavailable';
				reject(new LocalWeatherError(kind, positionError.message));
			},
			{ enableHighAccuracy: false, timeout: 10_000, maximumAge: 60_000 }
		);
	});
