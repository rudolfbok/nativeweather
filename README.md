<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="packages/app/assets/readme/logo_dark.png" width="200">
    <source media="(prefers-color-scheme: light)" srcset="packages/app/assets/readme/logo_light.png" width="200">
    <img alt="nativeweather logo" src="packages/app/assets/readme/logo_light.png" width="200">
  </picture>
</p>

<div align="center">

<!-- ![GitHub release](https://img.shields.io/github/v/release/rudolfbok/nativeweather) -->

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-FF4A03?logo=Cloudflare-Workers&logoColor=white)](https://nativeweather.app/) [![App Store](https://img.shields.io/badge/App_Store-0D96F6?logo=app-store&logoColor=white)](#) [![Google Play](https://img.shields.io/badge/Google%20Play-3CAB59?logo=google-play&logoColor=white)](https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME) [![MacOS](https://img.shields.io/badge/MacOS--9cf?logo=Apple&style=social)](https://your-link-here.com)

<!-- [![Web App](https://img.shields.io/badge/Web%20App-live-2F855A?logo=cloudflare&logoColor=white)](https://nativeweather.app/) -->

<!-- [![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)](#) [![iOS](https://img.shields.io/badge/iOS-<26-000000?&logo=apple&logoColor=white)](#) -->

<!-- [![Expo](https://img.shields.io/badge/Expo-55.0.15-000020?logo=expo&logoColor=fff&labelColor=000)](https://expo.dev/) [![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?logo=next.js&logoColor=white&labelColor=000)](https://nextjs.org/)  -->

[![React](https://img.shields.io/badge/React-149ECA.svg?logo=react&logoColor=fff)](https://react.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=fff)](https://expo.dev/) [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)

[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff)](https://pnpm.io/) [![Turborepo](https://img.shields.io/badge/Turborepo-EF4444.svg?logo=turborepo&logoColor=white)](https://turbo.build/repo)

</div>

<div align="center">
<img src="packages/app/assets/readme/ios_3.png" alt="iOS screeshot no. 3" width="200" />
&nbsp;
<!-- <img src="packages/app/assets/readme/ios_1.png" alt="iOS screeshot no. 1" width="200" /> -->
<img src="packages/app/assets/readme/ios_4.png" alt="iOS screeshot no. 2" width="200" />
&nbsp;
<img src="packages/app/assets/readme/ios_2.png" alt="iOS screeshot no. 2" width="200" />
<!-- &nbsp;
<img src="packages/app/assets/readme/web_1.png" alt="iOS screeshot no. 2" width="200" /> -->
</div>

<!-- <br/><br/>

<div align="center">

[![App Store](https://img.shields.io/badge/App%20Store-coming%20soon-0D96F6?logo=app-store&logoColor=white)](#)
[![Web App](https://img.shields.io/badge/Web%20App-live-2F855A?logo=cloudflare&logoColor=white)](https://nativeweather.app/)

[![iOS](https://img.shields.io/badge/iOS-26+-000000?logo=apple&logoColor=white)](#)
[![Expo](https://img.shields.io/badge/Expo-SDK%2055-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-deployed-FF4A03?logo=cloudflareworkers&logoColor=white)](https://nativeweather.app/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![VS Code](https://custom-icon-badges.demolab.com/badge/VS%20Code-0078D7.svg?logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)

</div> -->

<br/>

<div align="center">

NativeWeather is a cross-platform weather application for Web, iOS, Android and macOS
<br/><br/>
Built with Turborepo, Next.js, Expo, React Native, NativeWind, and shared app code in a monorepo PNPM workspace.

This started as my first long-term project and has grown into a real weather product with forecasts, air quality, maps, alerts, favorites, local weather, settings, localization, and iOS widgets.

</div>

- Visit the website: https://nativeweather.app
- Download on the App Store: https://appstore.apple.com
- Get it on Google Play: https://playstore.google.com
- Download the macOS app: https://nativeweather.pages.dev

## Features

- Current weather with condition-based visuals
- 7-day forecast and hourly forecast
- Smart weather summary
- Favorite cities
- Air quality data with EU AQI and US AQI support
- Weather alerts
- Light, dark, and system theme support
- English and Czech localization with Tolgee
- iOS widgets with Expo Widgets

## Tech Stack

- Turborepo
- pnpm workspaces
- Next.js 16
- Expo SDK 55
- React 19
- React Native
- React Native Web
- React Native macOS
- NativeWind
- React Native MMKV
- Tolgee

## Monorepo Structure

This is a monorepo project laced with Turborepo managed by PNPM workspaces connecting NextJS, Expo frameworks and bare React Native project with a shared code from packages/app folder

Many thanks to gurselcakar and his guide - https://www.gurselcakar.com/monorepo

<!-- <br/>
Universal React Monorepo template - https://github.com/gurselcakar/universal-react-monorepo -->

```txt
nativeweather/
├── apps/
│   ├── web/          # Next.js web app
│   └── mobile/       # Expo mobile app
│   └── macos/        # macOS desktop app
├── packages/
│   └── app/          # Shared app code, components, hooks, storage, API, types
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Getting Started

Prerequisites

- Node.js
- PNPM
- Xcode for iOS and macOS development
- Expo tooling for mobile development

This project uses pnpm:

```txt
pnpm install
```

## Dev scripts

Run the web app:

```txt
pnpm web
```

Run the mobile app:

```txt
pnpm mobile
```

Run the Mac desktop app:

```txt
pnpm macos
```
