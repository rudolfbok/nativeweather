# Nativeweather

A pnpm monorepo with one Expo UI for mobile, web, and the Tauri desktop shell.

## Development

```sh
pnpm install
pnpm dev          # Tauri → Expo/Metro on http://localhost:8081
pnpm dev:desktop  # Also starts Expo/Metro
pnpm dev:mobile   # Expo only, without the desktop shell
```

Tauri owns the Expo dev server through its `beforeDevCommand`. The combined
workflow starts only one Metro server. While the desktop is running, use that
same server for browser and mobile development instead of starting another one.

Expo web is a client-only SPA (`web.output: "single"`). Uniwind follows the system
theme automatically; the home-screen switch sets a light/dark override for the
current session. There is no custom theme bootstrap or persisted preference.

## Building

```sh
pnpm --filter nativeweather-mobile build  # Export Expo web to apps/expo/dist
pnpm build                               # Export the UI and bundle Tauri
```

Tauri's build hook exports Expo web and bundles `apps/expo/dist`.

## Linting

[Oxlint](https://oxc.rs/docs/guide/usage/linter.html) lints JavaScript and TypeScript across all apps and packages using the shared root `.oxlintrc.json`. The configuration enables correctness checks, TypeScript rules, and React/Hooks rules, and excludes generated files and build output. Errors and warnings fail the lint commands.

```sh
pnpm install
pnpm lint      # Check the entire monorepo
pnpm lint:fix  # Apply safe automatic fixes, then report remaining issues
```

Each JavaScript/TypeScript workspace also provides `lint` and `lint:fix` scripts. For example:

```sh
pnpm --filter nativeweather-mobile lint
pnpm --filter @nativeweather/ui lint:fix
pnpm --filter @nativeweather/ui lint
pnpm -r lint  # Run each workspace's lint script
```

Oxlint does not replace TypeScript type checking or Rust linting. Continue running type checks separately; use Clippy for the Tauri Rust code.
