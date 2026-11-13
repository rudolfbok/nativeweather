import { useState } from 'react';
import { Link } from 'react-router';
import androidIcon from '../assets/androidicon.svg';
import appIcon from '../assets/app-icon.png';
import appleIcon from '../assets/appleicon.svg';
import wordmark from '../assets/mainlogo.svg';
import wordmarkDark from '../assets/mainlogo_dark.svg';
import webIcon from '../assets/webicon.svg';
import { DownloadModal } from '../components/DownloadModal';
import { PlatformCard } from '../components/PlatformCard';
import { Separator } from '../components/Separator';
import { Text } from '../components/Text';

const YEAR = new Date().getFullYear();

const HomePage = () => {
	const [downloadOpen, setDownloadOpen] = useState(false);

	return (
		<main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-4 p-4 text-black dark:text-white">
			<title>NativeWeather — Official Website</title>
			<div className="flex w-full flex-col items-center gap-6 p-4 text-center">
				<img src={appIcon} alt="" width="1024" height="1024" className="h-auto w-18 max-w-full rounded-[22%]" />
				<h1>
					<picture>
						<source media="(prefers-color-scheme: dark)" srcSet={wordmarkDark} />
						<img src={wordmark} alt="NativeWeather" width="152" height="18" className="h-auto w-42 max-w-full" />
					</picture>
				</h1>
				<div className="flex flex-col gap-2">
					<Text as="p" className="max-w-xl text-zinc-600 dark:text-zinc-300">
						NativeWeather is a simple, cross-platform weather application with native features. Get accurate forecasts,
						local conditions, and your favorite cities in one place.
					</Text>
				</div>
			</div>
			<div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-4 dark:bg-[#1c1c1e]">
				<PlatformCard
					icon={webIcon}
					alt="Web icon"
					title="Web"
					subtitle="Hosted on Cloudflare Workers"
					actionLabel="Open web app"
					href="https://nativeweather.app/"
				/>
				<Separator />
				<PlatformCard
					icon={appleIcon}
					alt="iOS icon"
					title="iOS"
					subtitle="Download on the App Store"
					actionLabel="Coming soon"
					iconClassName="dark:invert"
				/>
				<Separator />
				<PlatformCard
					icon={androidIcon}
					alt="Android icon"
					title="Android"
					subtitle="Get it on Google Play"
					actionLabel="Coming soon"
				/>
				<Separator />
				<PlatformCard
					icon={appleIcon}
					alt="macOS icon"
					title="macOS"
					subtitle="Download the .dmg installer"
					actionLabel="Download"
					onAction={() => setDownloadOpen(true)}
					iconClassName="dark:invert"
				/>
				{/* <img src={windowsIcon} width="60" height="60" alt="Windows icon" /> */}
			</div>
			<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
				<a href="mailto:[REPLACE-WITH-SUPPORT-EMAIL]" className="hover:underline">
					Contact support
				</a>
				<Text className="text-left opacity-40">|</Text>
				<Link to="/tos" className="hover:underline">
					Terms of Service
				</Link>
				<Text className="text-left opacity-40">|</Text>
				<Link to="/policy" className="hover:underline">
					Privacy Policy
				</Link>
			</div>
			<Text as="p" className="text-sm opacity-60">
				© {YEAR}{' '}
				<a href="https://bitwebs.pages.dev" target="_blank" rel="noopener noreferrer" className="hover:underline">
					bitwebs
				</a>
			</Text>
			<DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
		</main>
	);
};

export default HomePage;
