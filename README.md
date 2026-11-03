# NativeWeather

A cross-platform weather application built with Expo, React Native, and Tauri.

One shared Expo application powers iOS, Android, Web, and desktop platforms, organized as a pnpm monorepo.

## Project Structure

```text
apps/
  expo/       Expo application (iOS, Android, Web)
  desktop/    Tauri desktop application

packages/
  ui/         Shared UI components
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

To be completed..

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
