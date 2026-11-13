import type { City, NormalizedData } from '@nativeweather/types';

export const getCityRegion = (city: City): string => city.region || city.name;

export const extractCity = (weatherData: NormalizedData): City => ({
	name: weatherData.location.name,
	region: getCityRegion({
		name: weatherData.location.name,
		region: weatherData.location.region,
		country: weatherData.location.country,
	}),
	country: weatherData.location.country,
});
