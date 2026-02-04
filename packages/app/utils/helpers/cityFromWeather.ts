import { City } from 'app/storage/crudMMKVService';
import { WeatherData } from 'app/types/weatherData';

export const cityFromWeather = (weatherData: WeatherData): City => ({
	name: weatherData.location.name,
	region: weatherData.location.region || weatherData.location.name,
	country: weatherData.location.country,
});
