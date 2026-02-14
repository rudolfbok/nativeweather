import { WeatherFeature } from 'app/features/weather/screen';

import { Metadata } from 'next';
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

export default function WeatherPage() {
	return <WeatherFeature />;
}
