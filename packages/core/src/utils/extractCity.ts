import type { City } from '@nativeweather/types/city';
import type { NormalizedData } from '@nativeweather/types/normalizedData';

export const getCityRegion = (city: City): string => {
	if (city.region && city.region !== city.name) return city.region;
	return city.country || city.region || city.name;
};

export const extractCity = (weatherData: NormalizedData): City => ({
	name: weatherData.location.name,
	region: getCityRegion({
		name: weatherData.location.name,
		region: weatherData.location.region,
		country: weatherData.location.country,
	}),
	country: weatherData.location.country,
});
