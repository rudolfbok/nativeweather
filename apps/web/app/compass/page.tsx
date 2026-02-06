import { CompassFeature } from 'app/features/compass/screen.web';
import { Metadata } from 'next';

export default function CompassPage() {
	return <CompassFeature />;
}

export const metadata: Metadata = {
	title: 'NativeWeather | Compass',
	description: 'Kompas pro web',
};
