import { Header } from '@nativeweather/ui/components/common/layout/Header.web';
import { ClientOnly } from '@nativeweather/ui/components/web/ClientOnly';
import { clsx } from 'clsx';
import { Metadata } from 'next';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../globals.css';
import { Providers } from './providers';
import { createPageMetadata, siteDescription, siteUrl } from './metadata';

export const metadata: Metadata = {
	...createPageMetadata({ title: 'NativeWeather', description: siteDescription }),
	metadataBase: new URL(siteUrl),
	applicationName: 'NativeWeather',
	title: { default: 'NativeWeather', template: '%s | NativeWeather' },
	manifest: '/site.webmanifest',
	icons: {
		icon: [
			{ url: '/favicon.svg', type: 'image/svg+xml' },
			{ url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
		],
		apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://tiles.openfreemap.org" />
				<link rel="preconnect" href="https://weathermaps.weatherapi.com" />
				<script
					defer
					src="https://cloud.umami.is/script.js"
					data-website-id="456c4be6-edf0-4594-9050-f577163b5be7"
				></script>
			</head>
			<body
				className={clsx(
					'flex-1 select-none bg-secondarySystemBackground px-4 dark:bg-systemBackground_dark min-[2200px]:px-80'
				)}
			>
				<ClientOnly fallback={<div className="theme-fallback fixed inset-0" />}>
					<Providers>
						<Header />
						{children}
					</Providers>
				</ClientOnly>
			</body>
		</html>
	);
}
