import { ClientOnly } from 'app/components/common/ClientOnly';
import { clsx } from 'clsx';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Metadata } from 'next';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'NativeWeather',
	description: 'React weather application'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					defer
					src="https://cloud.umami.is/script.js"
					data-website-id="456c4be6-edf0-4594-9050-f577163b5be7"
				></script>
			</head>
			<body
				className={clsx(
					'dark:bg-systemBackground_dark bg-secondarySystemBackground select-none px-4',
					geistSans.variable,
					geistMono.variable
				)}
			>
				<ClientOnly>
					<Providers>{children}</Providers>
				</ClientOnly>
			</body>
		</html>
	);
}
