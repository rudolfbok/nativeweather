<p align="center">

  <picture>

    <source media="(prefers-color-scheme: dark)" srcset="./assets/logo-dark.png">

    <source media="(prefers-color-scheme: light)" srcset="./assets/logo-light.png">

    <img alt="nativeweather logo" src="./assets/logo-light.png" width="320">

  </picture>

</p>

<div align="center">

[![App Store](https://img.shields.io/badge/App_Store-0D96F6?logo=app-store&logoColor=white)](#) [![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-FF4A03?logo=Cloudflare-Workers&logoColor=white)](https://nativeweather.app/)

<!-- [![Web App](https://img.shields.io/badge/Web%20App-live-2F855A?logo=cloudflare&logoColor=white)](https://nativeweather.app/) -->

<!-- [![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)](#) [![iOS](https://img.shields.io/badge/iOS-<26-000000?&logo=apple&logoColor=white)](#) -->

<!-- [![Expo](https://img.shields.io/badge/Expo-55.0.15-000020?logo=expo&logoColor=fff&labelColor=000)](https://expo.dev/) [![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?logo=next.js&logoColor=white&labelColor=000)](https://nextjs.org/)  -->

[![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=fff)](https://expo.dev/) [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)

[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff)](https://pnpm.io/) [![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)

</div>

<div align="center">

<img src="packages/app/assets/readme/ios_3.png" alt="iOS screeshot no. 3" width="200" />
<!-- <img src="packages/app/assets/readme/ios_1.png" alt="iOS screeshot no. 1" width="200" /> -->
<img src="packages/app/assets/readme/ios_2.png" alt="iOS screeshot no. 2" width="200" />

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

<div align="center">

NativeWeather is a cross-platform weather app for Web and iOS, built with a Turborepo monorepo, Next.js, Expo, React Native, React Native Web, NativeWind, and shared app code.

This started as my first long-term project and has grown into a real weather product with forecasts, air quality, maps, alerts, favorites, local weather, settings, localization, and iOS widgets.

</div>

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
- NativeWind
- React Native MMKV
- Tolgee

## Monorepo Structure

```txt
nativeweather/
├── apps/
│   ├── web/          # Next.js web app
│   └── mobile/       # Expo mobile app
├── packages/
│   └── app/          # Shared app code, components, hooks, storage, API, types
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Getting Started

Prerequisites

- Node.js
- pnpm
- Xcode for iOS development
- Expo tooling for mobile development

This project uses pnpm:

- pnpm install

Development
Run all development tasks through Turborepo:
pnpm dev
Run the web app:
pnpm --dir apps/web dev
Run the mobile app:
pnpm --dir apps/mobile dev
You can also use the root scripts:
pnpm web
pnpm mobile
