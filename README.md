<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/images/logo_dark.png" width="200">
    <source media="(prefers-color-scheme: light)" srcset="docs/images/logo_light.png" width="200">
    <img alt="nativeweather logo" src="docs/images/logo_light.png" width="200">
  </picture>
</p>

<div align="center">

<!-- ![GitHub release](https://img.shields.io/github/v/release/rudolfbok/nativeweather) -->

![Status](https://img.shields.io/badge/status-active%20development-blue)

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-FF4A03?logo=Cloudflare-Workers&logoColor=white)](https://nativeweather.app/) [![App Store](https://img.shields.io/badge/App_Store-0D96F6?logo=app-store&logoColor=white)](#) [![Google Play](https://img.shields.io/badge/Google%20Play-3CAB59?logo=google-play&logoColor=white)](#) [![MacOS](https://img.shields.io/badge/MacOS--9cf?logo=Apple&style=social)](#)

<!-- [![Web App](https://img.shields.io/badge/Web%20App-live-2F855A?logo=cloudflare&logoColor=white)](https://nativeweather.app/) -->

<!-- [![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)](#) [![iOS](https://img.shields.io/badge/iOS-<26-000000?&logo=apple&logoColor=white)](#) -->

<!-- [![Expo](https://img.shields.io/badge/Expo-55.0.15-000020?logo=expo&logoColor=fff&labelColor=000)](https://expo.dev/) [![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?logo=next.js&logoColor=white&labelColor=000)](https://nextjs.org/)  -->

[![React](https://img.shields.io/badge/React-149ECA.svg?logo=react&logoColor=fff)](https://react.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=fff)](https://expo.dev/) [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)

[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff)](https://pnpm.io/) [![Turborepo](https://img.shields.io/badge/Turborepo-EF4444.svg?logo=turborepo&logoColor=white)](https://turbo.build/repo)

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

** ⚠️ **THIS PROJECT IS UNDER ACTIVE DEVELOPMENT AND SHOULD BE CONSIDERED AS SUCH** **

NativeWeather is a cross-platform weather application for **Web, iOS, Android and macOS**
<br/><br/>
Built with **Turborepo**, **Next.js**, **Expo**, **React Native**, **NativeWind**, and shared app code in a monorepo **PNPM workspaces**.

This started as my first long-term project and has grown into a real weather product with forecasts, air quality, maps, alerts, favorites, local weather, iOS widgets and more.

</div>

- 🌐 **Website:** https://nativeweather.app

<!-- - Download on the App Store: In active development
- Get it on Google Play: In development
- Download the macOS app: In active development -->

## Features

- Current weather with condition-based visuals
- Hourly and 7-day forecasts
- Smart weather summaries
- Favorite locations
- Air quality (EU AQI & US AQI)
- Weather alerts
- Light, dark, and system themes
- English and Czech localization (Tolgee)
- iOS widgets (Expo Widgets)

## Tech Stack

- Turborepo
- pnpm Workspaces
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

This is a monorepo project laced with Turborepo managed by PNPM workspaces connecting NextJS, Expo frameworks and bare React Native project with shared code split across scoped workspace packages

Special thanks to [@gurselcakar](https://github.com/gurselcakar) for the excellent guide:
<br/>
Universal React Monorepo template - https://github.com/gurselcakar/universal-react-monorepo

```txt
nativeweather/
├── apps/
│   ├── web/          # Next.js web app
│   └── mobile/       # Expo mobile app
│   └── desktop/      # macOS desktop app
├── packages/
│   ├── ui/           # Screens, components, presentation hooks, and assets
│   ├── core/         # Storage, data hooks, weather stores, and utilities
│   ├── api/          # API clients, normalization, and condition catalog
│   ├── types/        # Shared data types
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

Packages consume lower layers: `apps → ui → core → api → types`. Apps and packages can import any lower layer directly; dependency cycles are not allowed. `types` contains data contracts only. Core owns shared data and location behavior; UI owns navigation, selection state, translations, notifications, and rendering. Translation JSON remains in core.

Use module imports such as `@nativeweather/core/hooks/weather/useWeather` across packages and relative imports within a package. Import contracts from `@nativeweather/types/*` with `import type`. Declare dependencies where they are used; app manifests own React and native runtime versions. Shared packages export TypeScript source directly, without a package build step or root barrels.

Package exports define concrete source files and platform variants. Metro selects `ios`, `android`, or `macos` exports under the `react-native` condition; other consumers select web implementations where available. Add a conditional export when introducing a public platform variant. TypeScript and bundlers resolve the same exports without workspace source aliases. The shared Tailwind preset lives at `@nativeweather/ui/tailwind.config`.

## Getting Started

### Prerequisites:

- Node.js
- pnpm
- Xcode (for iOS and macOS development)
- Expo tooling

This project uses pnpm:

```txt
pnpm install
```

## Dev scripts

#### Run the web app

```txt
pnpm dev:web
```

#### Run the mobile app

```txt
pnpm dev:mobile
```

#### Run the macOS desktop app

Install pod files

```txt
cd apps/desktop/macos
pod install
```

Run the desktop app from root

```txt
pnpm dev:macos
```

`dev:macos` starts Metro and builds and launches the desktop app once port 8081 is ready.

### Build commands

Run these commands from the monorepo root:

| Command              | Behavior                                                  |
| -------------------- | --------------------------------------------------------- |
| `pnpm build:web`     | Build the Next.js web app for production.                 |
| `pnpm build:ios`     | Build and launch the iOS development app on `iPhone 16e`. |
| `pnpm build:android` | Build and launch the Android development app.             |
| `pnpm build:macos`   | Build the macOS Release app using Xcode.                  |
| `pnpm deploy`        | Build and deploy the web app to Cloudflare.               |

Platform commands use Turbo package filters. Native build and deployment tasks are uncached.
The macOS Release app targets Apple Silicon (`arm64`) only and is written to `apps/desktop/release/nativeweather.app`.
`pnpm build` keeps its existing behavior and does not run the native build-and-launch tasks.
