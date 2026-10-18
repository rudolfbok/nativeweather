import { CrashIcon } from '@nativeweather/ui/components/icons/ui/CrashIcon';
import { StatusPage } from '@nativeweather/ui/components/web/StatusPage';
import { SuggestedCities } from '@nativeweather/ui/components/web/SuggestedCities';
import { createPageMetadata } from './metadata';

export const metadata = {
	...createPageMetadata({
		title: 'Page not found',
		description: "We couldn't find that location or page. Search for another city with NativeWeather.",
	}),
	robots: { index: false, follow: true },
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
