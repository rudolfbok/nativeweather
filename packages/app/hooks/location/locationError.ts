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
	if (error instanceof WeatherRequestError) {
		return new LocalWeatherError(error.status >= 500 ? 'server' : 'network', error.message, { cause: error });
	}
	if (error instanceof WeatherFetchError) return new LocalWeatherError('unknown', error.message, { cause: error });
	return new LocalWeatherError('network', 'Unable to load local weather.', { cause: error });
};
import { WeatherFetchError } from 'app/api/fetchWeather';
import { WeatherRequestError } from 'app/api/fetchWeatherAPI';
