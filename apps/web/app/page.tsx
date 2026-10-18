import { HomeFeature } from '@nativeweather/ui/features/home/screen';
import { createPageMetadata, siteDescription } from './metadata';

export const metadata = createPageMetadata({
	title: 'NativeWeather',
	description: siteDescription,
	path: '/',
});

export default function HomePage() {
	return <HomeFeature />;
}
