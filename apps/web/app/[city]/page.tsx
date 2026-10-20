import { WeatherFeature } from '@nativeweather/ui/features/weather/screen.web';
import { fetchWeatherAPIOrThrow } from '@nativeweather/api/fetchWeatherAPI';
import { mapWeatherApi } from '@nativeweather/api/mapWeatherAPI';
import { buildSlug } from '@nativeweather/core/utils/weatherSlug';
import { countryCode } from '@nativeweather/core/utils/countryCode';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '../metadata';

type WeatherPageProps = {
	params: Promise<{ city: string }>;
	searchParams: Promise<{ r?: string | string[]; cr?: string | string[] }>;
};

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const resolveCity = cache(async (city: string, region?: string, country?: string) => {
	const normalizedCity = city.trim().toLowerCase().replace(/\s+/g, '-');
	const query = country || region ? `${normalizedCity}, ${region ?? ''}, ${country ?? ''}` : normalizedCity;

	try {
		return await fetchWeatherAPIOrThrow(query, { cache: 'no-store' });
	} catch (error) {
		if (error instanceof Error && 'status' in error && [400, 404].includes(Number(error.status))) notFound();
		throw error;
	}
});

const getCity = async ({ params, searchParams }: WeatherPageProps) => {
	const [{ city }, { r, cr }] = await Promise.all([params, searchParams]);
	return resolveCity(city, firstValue(r), firstValue(cr));
};

export async function generateMetadata(props: WeatherPageProps) {
	const data = await getCity(props);
	const { name, region, country } = data.location;
	const code = countryCode(country);
	const countryLabel = code.length === 2 ? code.toUpperCase() : country;
	const location = [name, region, country]
		.map((part) => part.trim())
		.filter(
			(part, index, parts) => part && parts.findIndex((other) => other.toLowerCase() === part.toLowerCase()) === index
		)
		.join(', ');

	return createPageMetadata({
		title: countryLabel ? `${name} (${countryLabel})` : name,
		description: `Check current weather and forecasts for ${location} with NativeWeather.`,
		path: buildSlug(mapWeatherApi(data)),
	});
}

export default async function WeatherPage(props: WeatherPageProps) {
	const weather = mapWeatherApi(await getCity(props));
	return <WeatherFeature initialWeather={weather} />;
}
