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

export const toLocalWeatherError = (error: unknown) => {
	if (error instanceof LocalWeatherError) return error;
	if (error instanceof Error && 'status' in error && typeof error.status === 'number') {
		return new LocalWeatherError(error.status >= 500 ? 'server' : 'network', error.message, { cause: error });
	}
	return new LocalWeatherError('network', 'Unable to load local weather.', { cause: error });
};
