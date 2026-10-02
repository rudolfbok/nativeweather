export type LocalWeatherErrorKind =
	'source' | 'permission' | 'unavailable' | 'timeout' | 'network' | 'server' | 'unknown';

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

const failedLocationSources = new Map<string, LocalWeatherErrorKind>();

export const getLocationRequestFailure = (source: string) => failedLocationSources.get(source);

export const markLocationRequestFailed = (source: string, kind: LocalWeatherErrorKind) =>
	failedLocationSources.set(source, kind);

export const clearLocationRequestFailures = () => failedLocationSources.clear();

export const isExpectedLocationError = (error: LocalWeatherError) =>
	error.kind === 'permission' || error.kind === 'unavailable' || error.kind === 'timeout';

export const toLocalWeatherError = (error: unknown) => {
	if (error instanceof LocalWeatherError) return error;
	const message = error instanceof Error ? error.message : String(error);
	if (/LocationUnavailable|kCLErrorDomain error 0|Cannot obtain current location/i.test(message)) {
		return new LocalWeatherError('unavailable', 'Your device could not determine its location.', { cause: error });
	}
	if (error instanceof Error && 'status' in error && typeof error.status === 'number') {
		return new LocalWeatherError(error.status >= 500 ? 'server' : 'network', error.message, { cause: error });
	}
	return new LocalWeatherError('network', 'Unable to load local weather.', { cause: error });
};
