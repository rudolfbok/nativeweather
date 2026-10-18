import { Metadata } from 'next';

export const siteUrl = 'https://nativeweather.app';
const siteName = 'NativeWeather';
export const siteDescription = 'Explore current weather and forecasts for cities around the world with NativeWeather.';

export const createPageMetadata = ({
	title,
	description,
	path,
}: {
	title: string;
	description: string;
	path?: string;
}): Metadata => {
	const pageTitle = title === siteName ? siteName : `${title} | ${siteName}`;
	const url = path ? new URL(path, siteUrl).href : undefined;
	const images = [
		{
			url: '/preview-image.png',
			width: 1200,
			height: 630,
			alt: 'NativeWeather weather app preview',
		},
	];

	return {
		title: { absolute: pageTitle },
		description,
		...(url ? { alternates: { canonical: url } } : {}),
		openGraph: {
			type: 'website',
			siteName,
			locale: 'en_US',
			title: pageTitle,
			description,
			...(url ? { url } : {}),
			images,
		},
		twitter: {
			card: 'summary_large_image',
			title: pageTitle,
			description,
			images,
		},
	};
};
