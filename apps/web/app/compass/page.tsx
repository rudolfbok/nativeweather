import { CompassFeature } from 'app/features/compass/screen.web';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'NativeWeather | Compass',
	description: 'Web compass in your browser',
	twitter: {
		card: 'summary',
		title: 'NativeWeather | Compass',
		description: 'Web compass in your browser',
		siteId: '1467726470533754880',
		creator: '@nextjs',
		creatorId: '1467726470533754880',
		images: ['https://nativeweather.app/preview-image.png'],
	},
	openGraph: {
		type: 'website',
		title: 'NativeWeather | Compass',
		description: 'Web compass in your browser',
		url: 'https://nativeweather.app/compass',
		siteName: 'NativeWeather - Compass ',
		images: [
			{
				url: 'https://nativeweather.app/preview-image.png',
			},
		],
	},
};

export default function CompassPage() {
	return <CompassFeature />;
}
