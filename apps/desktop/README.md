# NativeWeather desktop

A Tauri shell for the Expo web UI in `apps/expo`. There is no separate desktop
React app or Vite build.

From the repository root:

```sh
pnpm dev          # Run desktop directly
pnpm dev:desktop  # Run desktop directly
```

Or from this directory:

```sh
pnpm tauri dev
pnpm tauri build
```

The Tauri dev hook starts Expo/Metro on port 8081. The build hook exports the
client-only Expo web app and bundles `../expo/dist` into the desktop application.
Both hooks are configured in `src-tauri/tauri.conf.json`, so direct Tauri CLI
commands work without first starting or building the frontend manually.

Use the existing Expo server while desktop development is running; do not start
a second server on port 8081.

## Native checks

```sh
cargo check --manifest-path src-tauri/Cargo.toml
cargo clippy --manifest-path src-tauri/Cargo.toml
```
