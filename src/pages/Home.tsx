import { Link } from "react-router";
import androidIcon from "../assets/androidicon.svg";
import appleIcon from "../assets/appleicon.svg";
import mainLogo from "../assets/mainlogo.svg";
import mainLogoDark from "../assets/mainlogo_dark.svg";
import webIcon from "../assets/webicon.svg";
import { Text } from "../components/Text";

const HomePage = () => {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center gap-8 bg-sky-50/70 p-4 text-black dark:bg-sky-950/20 dark:text-white sm:p-8">
      <title>NativeWeather — Official Website</title>
      <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl bg-white p-6 text-center dark:bg-zinc-950 sm:p-10">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcSet={mainLogoDark} />
          <img src={mainLogo} alt="nativeweather" />
        </picture>
        <div className="flex flex-col gap-2">
          <Text as="h1" className="text-2xl font-semibold sm:text-3xl">
            Weather, wherever you are.
          </Text>
          <Text as="p" className="max-w-xl text-zinc-600 dark:text-zinc-300">
            Cross-platform weather application for Web, iOS, macOS, and Android.
          </Text>
        </div>
      </div>
      <div className="-mt-4 flex w-full max-w-3xl flex-col gap-4">
        <Text as="h2" className="text-left text-xl font-semibold">
          Available on
        </Text>
        <div className="flex flex-row items-center gap-2">
          <img src={webIcon} width="60" height="60" alt="Web icon" />
          <div className="flex flex-col">
            <Text className="text-left font-semibold">Web</Text>
            <a
              href="https://nativeweather.app/"
              className="text-[#007AFF] hover:underline"
            >
              Open web app
            </a>
          </div>
        </div>
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
        <a href="mailto:[REPLACE-WITH-SUPPORT-EMAIL]" className="text-[#007AFF] hover:underline">Contact support</a>
        <Text className="text-left opacity-40">|</Text>
        <Link
          to="/tos"
          className="text-[#007AFF] hover:underline"
        >
          Terms of Service
        </Link>
        <Text className="text-left opacity-40">|</Text>
        <Link
          to="/policy"
          className="text-[#007AFF] hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
