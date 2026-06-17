import type { City } from 'app/types/city';
import { NormalizedData } from 'app/types/normalizedData';

export const extractCity = (weatherData: NormalizedData): City => ({
	name: weatherData.location.name,
	region: weatherData.location.region || weatherData.location.name,
	country: weatherData.location.country,
});
