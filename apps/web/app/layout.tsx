import { Header } from 'app/components/common/layout/Header.web';
import { ClientOnly } from 'app/components/web/ClientOnly';
import { clsx } from 'clsx';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../globals.css';
import { Providers } from './providers';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
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
