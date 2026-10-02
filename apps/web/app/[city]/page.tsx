import { WeatherFeature } from '@nativeweather/ui/features/weather/screen.web';
import { fetchWeatherAPIOrThrow } from '@nativeweather/api/fetchWeatherAPI';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	description: 'Current weather data',
	twitter: {
		card: 'summary',
		description: 'Current weather data',
		// siteId: '1467726470533754880',
		// creator: '@nextjs',
		// creatorId: '1467726470533754880',
		images: ['https://nativeweather.app/preview-image.png'],
	},
	openGraph: {
		type: 'website',
		description: 'Current weather data',
		url: 'https://nativeweather.app/compass',
		images: [
			{
				url: 'https://nativeweather.app/preview-image.png',
			},
		],
	},
};

const validateCity = async (query: string) => {
	try {
		await fetchWeatherAPIOrThrow(query, { cache: 'no-store' });
	} catch (error) {
		if (error instanceof Error && 'status' in error && [400, 404].includes(Number(error.status))) notFound();
		throw error;
	}
};

export default async function WeatherPage({
	params,
	searchParams,
}: {
	params: Promise<{ city: string }>;
	searchParams: Promise<{ r?: string; cr?: string }>;
}) {
	const [{ city }, { r: region, cr: country }] = await Promise.all([params, searchParams]);
	const normalizedCity = city.trim().toLowerCase().replace(/\s+/g, '-');
	const query = country || region ? `${normalizedCity}, ${region ?? ''}, ${country ?? ''}` : normalizedCity;
	await validateCity(query);

	return <WeatherFeature />;
}
