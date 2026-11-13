<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/images/logo_dark.png" width="200">
    <source media="(prefers-color-scheme: light)" srcset="docs/images/logo_light.png" width="200">
    <img alt="NativeWeather logo" src="docs/images/logo_light.png" width="200">
  </picture>
	<p><strong>⚠️ THIS PROJECT IS UNDER ACTIVE DEVELOPMENT AND SHOULD BE CONSIDERED AS SUCH</strong></p>
  <p>A cross-platform weather application built with Expo, React Native, and Tauri.</p>
  <p>One shared Expo application powers iOS, Android, Web, and desktop platforms, organized as a pnpm monorepo.</p>
</div>

## Project Structure

```text
├── apps/
│   ├── expo/                # Expo app (iOS, Android, Web)
│   ├── desktop/             # Tauri desktop shell (uses Expo Web)
│   ├── api/                 # Cloudflare Worker API (proxies weather providers)
│   ├── site/                # Marketing site (Vite + React, Cloudflare Pages)
│   └── worker/              # Cloudflare Worker for nativeweather.app
├── packages/
│   ├── api/                 # Weather and location API clients
│   └── types/               # Shared TypeScript types
└── pnpm-workspace.yaml      # pnpm monorepo config
```

## Development

### Installation

```bash
pnpm install
```

### Expo (iOS, Android, Web)

Start the Expo development server:

```bash
pnpm dev
```

Expo runs on `http://localhost:8081` and provides an interactive CLI for launching iOS, Android, and Web.

### Desktop (Tauri)

With the Expo server running, open a second terminal:

```bash
pnpm dev:desktop
```

Tauri connects to the existing Expo Web server at `http://localhost:8081`.

**Only one Expo/Metro server should be running.** Tauri does not start or manage its own Expo process.

## Building

### Web

Export the Expo Web build to `apps/expo/dist`:

```bash
pnpm build:web
```

Preview it locally through the Cloudflare Worker (builds first):

```bash
pnpm preview:web
```

Deploy to nativeweather.app (builds first, then runs `wrangler deploy`):

```bash
pnpm deploy:web
```

The Worker serves the exported files, rewrites the `<head>` tags for city pages, and returns 404 for unknown cities.

### Desktop (Tauri)

Build the desktop application:

```bash
pnpm build:desktop
```

This runs `tauri build` and packages the Expo Web export from `apps/expo/dist`. Rust and the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) must be installed.

### iOS and Android

Create a native development build locally:

```bash
pnpm --filter @nativeweather/expo ios
pnpm --filter @nativeweather/expo android
```

Release builds use EAS with the `development`, `preview`, and `production` profiles defined in `apps/expo/eas.json`:

```bash
cd apps/expo
eas build --platform ios --profile production
```

## Code Quality

The monorepo uses Oxlint for JavaScript and TypeScript linting.

```bash
pnpm lint        # Check all workspaces
pnpm lint:fix    # Automatically fix supported issues
pnpm typecheck   # Run TypeScript checks
```

Oxlint uses the shared `.oxlintrc.json` configuration. Rust code can be checked separately using Clippy.

## Architecture

- **Expo** — Shared application for iOS, Android, and Web.
- **React Native Web** — Web rendering used by browsers and Tauri.
- **Tauri 2** — Native desktop shell for macOS, Windows, and Linux.
- **Uniwind** — Cross-platform styling and theme management.
- **pnpm workspaces** — Dependency management and shared packages.

Development uses a single Expo/Metro server shared across platforms. No additional task runner or build orchestrator is required.

## API

The weather API Worker lives in `apps/api`. Run it locally with `pnpm dev:api` (put `WEATHER_API_KEY` in `apps/api/.env.local`) and deploy with `pnpm deploy:api`. See `apps/api/README.md` for endpoints.
