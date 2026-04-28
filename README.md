<p align="center">
  <img src="packages/app/assets/logo.png" alt="NativeWeather logo" width="200" />
</p>

<div align="center">

[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff)](#) ![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=visualstudiocode&logoColor=whit#e)

[![App Store](https://img.shields.io/badge/App_Store-0D96F6?logo=app-store&logoColor=white)](#) [![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-FF4A03?logo=Cloudflare-Workers&logoColor=white)](##) [![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=fff)](##) [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](##) [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](##) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](##) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)

[![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)](#) [![iOS](https://img.shields.io/badge/iOS-000000?&logo=apple&logoColor=white)](#)

</div>

NativeWeather is a cross-platform weather app for Web and iOS, built with a Turborepo monorepo, Next.js, Expo, React Native, React Native Web, NativeWind, and shared app code.

This started as my first long-term project and has grown into a real weather product with forecasts, air quality, maps, alerts, favorites, local weather, settings, localization, and iOS widgets.

## Features

- Current weather with condition-based visuals
- 7-day forecast and hourly forecast
- Smart weather summary
- Weather alerts
- Air quality data with EU AQI and US AQI support
- Rain, snow, wind, humidity, UV, pressure, visibility, sunrise, sunset, moon, and cloud cards
- Search with suggestions and recent searches
- Favorite cities
- Local weather using device location
- Multiple weather data sources
- Light, dark, and system theme support
- Metric and imperial unit support
- Celsius and Fahrenheit support
- English and Czech localization with Tolgee
- Web support through Next.js and React Native Web
- iOS support through Expo Router
- iOS widgets with Expo Widgets
- Shared UI and business logic through `packages/app`

## Tech Stack

- Turborepo
- pnpm workspaces
- Next.js 16
- Expo SDK 55
- React 19
- React Native
- React Native Web
- Expo Router
- NativeWind
- Tailwind CSS
- Zustand
- React Native MMKV
- Tolgee
- OpenNext for Cloudflare
- TypeScript

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
