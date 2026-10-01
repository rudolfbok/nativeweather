import { HomeFeature } from '@nativeweather/ui/features/home/screen';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'NativeWeather',
	description: 'Cross-platform weather application',
	twitter: {
		card: 'summary',
		title: 'NativeWeather',
		description: 'Cross-platform weather application',
		// siteId: '1467726470533754880',
		// creator: '@nextjs',
		// creatorId: '1467726470533754880',
		images: ['https://nativeweather.app/preview-image.png'],
	},
	openGraph: {
		type: 'website',
		description: 'Cross-platform weather application',
		title: 'NativeWeather',
		url: 'https://nativeweather.app',
		siteName: 'NativeWeather',
		images: [
			{
				url: 'https://nativeweather.app/preview-image.png', // Must be an absolute URL
				width: 800,
				height: 600,
			},
		],
	},
};

export default function HomePage() {
	return <HomeFeature />;
}
