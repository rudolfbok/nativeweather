import type { NormalizedData } from '@nativeweather/types';
import { countryCode } from './countryCode';

/** `Prague (CZ) | NativeWeather`: the page title of a city, in the app and in the site Worker's HTML. */
export const getCityTitle = ({ name, country }: Pick<NormalizedData['location'], 'name' | 'country'>) => {
	const code = countryCode(country);
	return `${name} (${code.length === 2 ? code.toUpperCase() : country}) | NativeWeather`;
};
