export type LocalWeatherErrorKind = 'permission' | 'unavailable' | 'timeout' | 'network' | 'unknown';

export class LocalWeatherError extends Error {
	constructor(
		readonly kind: LocalWeatherErrorKind,
		message: string,
		options?: { cause?: unknown }
	) {
		super(message, options);
		this.name = 'LocalWeatherError';
	}
}

let failedLocationRequest: LocalWeatherErrorKind | undefined;

export const getLocationRequestFailure = () => failedLocationRequest;

export const markLocationRequestFailed = (kind: LocalWeatherErrorKind) => (failedLocationRequest = kind);

export const clearLocationRequestFailures = () => (failedLocationRequest = undefined);

export const isExpectedLocationError = (error: LocalWeatherError) =>
	error.kind === 'permission' || error.kind === 'unavailable' || error.kind === 'timeout';

export const toLocalWeatherError = (error: unknown) => {
	if (error instanceof LocalWeatherError) return error;
	const message = error instanceof Error ? error.message : String(error);
	if (/LocationUnavailable|kCLErrorDomain error 0|Cannot obtain current location/i.test(message)) {
		return new LocalWeatherError('unavailable', 'Your device could not determine its location.', { cause: error });
	}
	return new LocalWeatherError('network', 'Unable to load local weather.', { cause: error });
};
