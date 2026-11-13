# NativeWeather — Agent Instructions

## Architecture

- pnpm workspace monorepo.
- `apps/expo` — Expo application for iOS, Android, and Web.
- `apps/desktop` — Tauri 2 desktop shell using Expo Web.
- `apps/site` — Vite + React + Tailwind marketing site, deployed to Cloudflare Pages (`nativeweather.pages.dev`). Vite is intentional here; it is separate from the Expo app. Run with `pnpm dev:site`.
- `apps/worker` — Cloudflare Worker for nativeweather.app: serves the Expo web export, rewrites city `<head>` tags (title, description, canonical, OG), and returns 404 for unknown cities. Run with `pnpm preview:web`.
- `apps/expo/src/ui` and `apps/expo/src/core` — UI components and app logic (hooks, storage, utils, locales), imported via the `@/ui` and `@/core` aliases.
- `packages/types` and `packages/api` — Pure TypeScript with no React Native, Expo, or other platform dependencies.
- Use a single Expo/Metro development server on port 8081.
- Tauri connects to the existing Expo Web server.
- Do not introduce Turborepo or an additional frontend bundler.

## Development

- Use pnpm exclusively.
- Run `pnpm dev` to start Expo.
- Run `pnpm dev:desktop` separately for Tauri.
- Keep shared functionality in the appropriate workspace package.
- Follow existing project conventions before introducing new abstractions.

## Code Quality

- Use TypeScript for application code.
- Keep implementations simple and cross-platform.
- Run lint and type checks after changes.
- Avoid unnecessary dependencies, duplicated configuration, and platform-specific code unless required.
