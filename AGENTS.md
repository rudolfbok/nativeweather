# NativeWeather — Agent Instructions

## Architecture

- pnpm workspace monorepo.
- `apps/expo` — Expo application for iOS, Android, and Web.
- `apps/desktop` — Tauri 2 desktop shell using Expo Web.
- `packages/ui` — Shared React Native UI components.
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
