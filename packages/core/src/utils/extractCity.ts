import type { City } from '@nativeweather/types/city';
import { NormalizedData } from '@nativeweather/types/normalizedData';

export const extractCity = (weatherData: NormalizedData): City => ({
	name: weatherData.location.name,
	region: weatherData.location.region || weatherData.location.name,
	country: weatherData.location.country,
});
