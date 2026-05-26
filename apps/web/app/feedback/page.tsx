import { FeedbackFeature } from 'app/features/feedback/screen';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'NativeWeather | Feedback',
	description: 'Web compass in your browser',
	twitter: {
		card: 'summary',
		title: 'NativeWeather | Feedback',
		description: 'Web compass in your browser',
		siteId: '1467726470533754880',
		creator: '@nextjs',
		creatorId: '1467726470533754880',
		images: ['https://nativeweather.app/preview-image.png'],
	},
	openGraph: {
		type: 'website',
		title: 'NativeWeather | Feedback',
		description: 'Web compass in your browser',
		url: 'https://nativeweather.app/feedback',
		siteName: 'NativeWeather - Feedback',
		images: [
			{
				url: 'https://nativeweather.app/preview-image.png',
			},
		],
	},
};

export default function FeedbackPage() {
	return <FeedbackFeature />;
}
