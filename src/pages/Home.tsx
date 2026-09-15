import { Link } from "react-router";
import androidIcon from "../assets/androidicon.svg";
import appleIcon from "../assets/appleicon.svg";
import mainLogo from "../assets/mainlogo.svg";
import mainLogoDark from "../assets/mainlogo_dark.svg";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import webIcon from "../assets/webicon.svg";
import { Text } from "../components/Text";

const HomePage = () => {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 p-4 text-black dark:text-white">
      <title>NativeWeather</title>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={mainLogoDark} />
        <img src={mainLogo} alt="nativeweather" />
      </picture>
      <div className="gap-1 flex flex-col">
        <Text as="p">
          Cross-platform weather application written in React Native
        </Text>
        <Text as="p">Available on Web, iOS, Android and macOS</Text>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/2 xl:w-1/3">
        <div className="flex flex-row items-center gap-2">
          <img src={webIcon} width="60" height="60" alt="Web icon" />
          <div className="flex flex-col">
            <Text className="text-left font-semibold">Web</Text>
            <a href="https://nativeweather.app/" className="hover:opacity-80">
              https://nativeweather.app/
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
      <div className="flex-row gap-2 flex">
        <Link to="/tos" className="hover:opacity-70">
          Terms of Service
        </Link>
        <Text className="text-left">|</Text>
        <Link to="/policy">Privacy Policy</Link>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-row gap-1 items-center">
        <Text className="text-xs">Made with</Text>
        <img src={viteLogo} width={20} height={20} />
        <Text className="text-xs">+</Text>
        <img src={reactLogo} width={20} height={20} />
      </div>
    </main>
  );
};

export default HomePage;
