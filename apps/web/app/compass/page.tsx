import { CompassFeature } from '@nativeweather/ui/features/compass/screen';
import { createPageMetadata } from '../metadata';

export const metadata = createPageMetadata({
	title: 'Compass',
	description: 'Find your direction with the NativeWeather compass in your browser.',
	path: '/compass',
});

export default function CompassPage() {
	return <CompassFeature />;
}
