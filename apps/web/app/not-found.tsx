import { CrashIcon } from '@nativeweather/ui/components/icons/ui/CrashIcon';
import { StatusPage } from '@nativeweather/ui/components/web/StatusPage';
import { SuggestedCities } from '@nativeweather/ui/components/web/SuggestedCities';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'NativeWeather | Not found',
	// description: 'Web compass in your browser',
	// twitter: {
	// 	card: 'summary',
	// 	title: 'NativeWeather | Compass',
	// 	description: 'Web compass in your browser',
	// 	siteId: '1467726470533754880',
	// 	creator: '@nextjs',
	// 	creatorId: '1467726470533754880',
	// 	images: ['https://nativeweather.app/preview-image.png'],
	// },
	// openGraph: {
	// 	type: 'website',
	// 	title: 'NativeWeather | Compass',
	// 	description: 'Web compass in your browser',
	// 	url: 'https://nativeweather.app/compass',
	// 	siteName: 'NativeWeather - Compass ',
	// 	images: [
	// 		{
	// 			url: 'https://nativeweather.app/preview-image.png',
	// 		},
	// 	],
	// },
};

export default function NotFound() {
	return (
		<StatusPage
			title="Weather not found"
			icon={<CrashIcon />}
			description="We couldn't find that location or page. Check the address, or search for another city."
			actions={<SuggestedCities />}
		/>
	);
}
