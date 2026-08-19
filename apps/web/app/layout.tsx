import { ClientOnly } from 'app/components/common/web/ClientOnly';
import { Header } from 'app/components/navigation/Header.web';
import { clsx } from 'clsx';
import { Geist, Geist_Mono } from 'next/font/google';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../globals.css';
import { Providers } from './providers';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

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
					'select-none bg-secondarySystemBackground px-4 dark:bg-systemBackground_dark min-[2200px]:px-80',
					geistSans.variable,
					geistMono.variable
				)}
			>
				<ClientOnly>
					<Providers>
						<Header />
						{children}
					</Providers>
				</ClientOnly>
			</body>
		</html>
	);
}
