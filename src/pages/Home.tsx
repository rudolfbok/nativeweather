import { Link } from "react-router";
import androidIcon from "../assets/androidicon.svg";
import appleIcon from "../assets/appleicon.svg";
import appIcon from "../assets/app-icon.png";
import wordmark from "../assets/mainlogo.svg";
import wordmarkDark from "../assets/mainlogo_dark.svg";
import webIcon from "../assets/webicon.svg";
import { Text } from "../components/Text";
import { Separator } from "../components/Separator";

const HomePage = () => {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-4 max-w-2xl mx-auto p-4 text-black dark:text-white">
			<title>NativeWeather — Official Website</title>
			<div className="flex w-full flex-col items-center gap-6 p-4 text-center">
				<img
					src={appIcon}
					alt=""
					width="1024"
					height="1024"
					className="h-auto w-18 max-w-full rounded-[22%]"
				/>
				<h1>
					<picture>
						<source
							media="(prefers-color-scheme: dark)"
							srcSet={wordmarkDark}
						/>
						<img
							src={wordmark}
							alt="NativeWeather"
							width="152"
							height="18"
							className="h-auto w-42 max-w-full"
						/>
					</picture>
				</h1>
				<div className="flex flex-col gap-2">
					<Text as="p" className="max-w-xl text-zinc-600 dark:text-zinc-300">
						NativeWeather is a simple, cross-platform weather application with
						native features. Get accurate forecasts, local conditions, and your
						favorite cities in one place.
					</Text>
				</div>
			</div>
			<div className="flex w-full flex-col gap-4 dark:bg-white/2 bg-white p-4 rounded-3xl">
				{/* <Text as="h2" className="text-left text-xl font-semibold">
					Available on
				</Text> */}
				<div className="flex flex-row items-center gap-2">
					<img src={webIcon} width="60" height="60" alt="Web icon" />
					<div className="flex flex-col">
						<Text className="text-left font-semibold">Web</Text>
						<a href="https://nativeweather.app/" className="hover:underline">
							Open web app
						</a>
					</div>
				</div>
				<Separator />
				<div className="flex flex-row items-center gap-2">
					<img
						src={appleIcon}
						width="60"
						height="60"
						alt="Apple icon"
						className="dark:invert"
					/>
					<div className="flex flex-col">
						<Text className="text-left font-semibold">iOS</Text>
						<Text className="text-left">Get it on the Appstore</Text>
						<Text className="text-left font-semibold">macOS</Text>
						<Text className="text-left">Download .dmg file (80MB)</Text>
					</div>
				</div>
				<Separator />
				<div className="flex flex-row items-center gap-2">
					<img src={androidIcon} width="60" height="60" alt="Android icon" />
					<div className="flex flex-col">
						<Text className="text-left font-semibold">Android</Text>
						<Text className="text-left">Soon on Google Play store</Text>
					</div>
				</div>
				{/* <img src={windowsIcon} width="60" height="60" alt="Windows icon" /> */}
			</div>
			<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
				<a
					href="mailto:[REPLACE-WITH-SUPPORT-EMAIL]"
					className="hover:underline"
				>
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
		</main>
	);
};

export default HomePage;
