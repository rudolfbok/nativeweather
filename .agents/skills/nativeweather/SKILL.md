---
name: nativeweather
description: NativeWeather repository guidance for shared React Native code, Expo iOS and Android, React Native macOS, Next.js web, Cloudflare/OpenNext deployment, and project-specific architecture and style.
---

# NativeWeather

Use this skill for changes anywhere in the NativeWeather monorepo, especially `packages/ui`, `packages/core`, `packages/api`, `packages/types`, `apps/mobile`, `apps/desktop`, `apps/web`, shared UI, storage, weather APIs, NativeWind styling, Expo Router, macOS navigation, or Cloudflare/OpenNext deployment.

## Product and platform scope

NativeWeather is one shared product delivered to four targets:

- `apps/web`: Next.js web application using React Native Web.
- `apps/mobile`: Expo application for iOS and Android. The current package is Expo SDK 57, React Native 0.86, React 19.2, and Expo Router.
- `apps/desktop`: React Native macOS application. macOS-specific files and navigation are production code.
- `packages/ui`: shared components, features, presentation hooks, providers, UI assets, and platform variants imported through `@nativeweather/ui/*`.
- `packages/core`: shared storage, data hooks, weather stores, location behavior, constants, and utilities imported through `@nativeweather/core/*`.
- `packages/api`: weather requests, response normalization, and API-level error handling imported through `@nativeweather/api/*`.
- `packages/types`: shared public data types imported through `@nativeweather/types/*`.
- `packages/ui/tailwind.config.js`: shared Tailwind theme tokens and NativeWind preset.

Platform files currently used include `.web.tsx`, `.macos.tsx`, `.android.tsx`, and `.ios.tsx`. Check all relevant variants before changing shared behavior.

The README may lag behind the manifests. Treat package manifests, app configuration, and existing scripts as the source of truth.

## Architecture and folder boundaries

Keep changes inside the existing architecture:

- `packages/api/src`: weather/API requests, normalization, and API-level error handling.
- `packages/ui/src/components`: reusable UI and platform-specific component variants.
- `packages/core/src/database`: MMKV initialization, defaults, persistence hooks, and storage CRUD.
- `packages/ui/src/features`: screen-level behavior and feature composition.
- `packages/core/src/hooks`: shared weather and favorite data, location platform variants, map data requests, and countdown behavior.
- `packages/ui/src/hooks`: navigation, theme, selection state, translated conditions, widget rendering, screen controllers, and favorite notification wrappers.
- `packages/core/src/locales`: Tolgee translations.
- `packages/types/src`: shared public data boundaries.
- `packages/ui/tailwind.config.js`: shared theme tokens; app Tailwind configs own source scanning and CSS integration.
- `apps/mobile/app`: Expo Router routes and mobile app startup/configuration.
- `apps/desktop/app` and `apps/desktop/macos`: macOS app composition and native integration.
- `apps/web/app`: Next.js routes, metadata, and web-only entrypoints.

Workspace dependencies flow from apps to UI, core, API, and types. Apps and packages may import any lower layer directly. Core must not import UI; API must not import core or UI; types has no runtime dependencies. Translations stay in core as JSON data; translation providers and hooks stay in UI. Theme initialization and native sharing belong in UI.

Use `@nativeweather/<package>/<module>` for cross-package imports and relative imports inside a package. Import shared contracts with `import type`. Package exports point to source files and select platform variants; do not bypass them with TypeScript workspace aliases or direct imports into another package's `src`. Declare every imported dependency in the consuming package. React and native platform runtimes remain app-owned peers. There are no package root barrels or compilation steps. When adding a platform variant for a public module, update its conditional export; Metro asserts `ios`, `android`, or `macos` conditions inside `react-native`, while the default selects web where available.

Do not invent a service layer, design system, repository pattern, generic abstraction, or new folder boundary for a one-off change. Keep behavior with the component, feature, hook, or API layer that already owns it.

## Coding style and UI rules

Match the existing coding style every time: short direct components, tabs, semicolons, single quotes, trailing commas, inferred locals, and minimal unrelated churn.

- Use `clsx` for every `className`, including static class strings, for project-wide consistency.
- Use NativeWind/Tailwind classes for styling. Do not add inline `style` objects or `StyleSheet.create` in new or modified code.
- Reuse existing wrappers such as `StyledText`, `StyledPressable`, `RoundView`, `ContentRow`, `ScreenWrapper`, and project constants before using raw primitives.
- Keep visible strings in `StyledText` or an existing text wrapper and add user-facing copy to Tolgee locales.
- Do not import types when ordinary inference or an existing exported type is sufficient. Type public props and data boundaries; avoid decorative or duplicated types.
- Prefer `const`, early returns, direct `async`/`await`, and simple branches.
- Do not add `useMemo`, `useCallback`, `memo`, reducers, context, or state machines without a demonstrated need.
- Keep event handlers near the component that owns them. Extract a hook only when behavior is genuinely reused or materially simplifies a large screen.
- Use `Pressable` or `StyledPressable` for interactions and preserve usable touch targets on native and web.
- Do not refactor nearby code merely to make it look different. Preserve user changes and unrelated worktree edits.

If an existing platform API forces a runtime style object, first look for an existing project wrapper or platform file. Do not expand inline-style usage; if it is unavoidable, call it out in the handoff.

## React Native, Expo, and platform behavior

Use the project’s installed versions and official versioned documentation. Mobile currently targets Expo SDK 58:

- Do not use SDK APIs based only on latest documentation. Check the SDK 58 API and release notes first.
- For upgrade-sensitive changes, check the Expo SDK 58 documentation and run `expo-doctor` when dependency compatibility is affected.
- Keep Expo, React Native, Router, and native modules aligned to the SDK 58 release matrix.
- Preserve the New Architecture and existing Expo Router structure.
- Keep native-only location, storage, map, widget, and permission code out of web bundles unless the web implementation needs an explicit equivalent.
- Keep macOS behavior in `.macos` files and `apps/desktop` native integration; do not force mobile navigation assumptions onto macOS.
- Keep web-only DOM behavior in `.web` files and use the existing web theme synchronization.

Use the existing Zustand and MMKV hooks. MMKV defaults belong in `initStorageDefaults.ts`; persisted preferences should survive restarts unless a reset is explicitly requested. Be aware that startup code can intentionally clear storage on macOS, so inspect app entrypoints before diagnosing persistence.

Weather UI consumes normalized data. Keep requests, authentication, normalization, provider errors, and the canonical weather condition catalog in `packages/api/src`. Shared data hooks and request coordination belong in `packages/core/src/hooks`; UI owns translated notifications and rendering. WeatherAPI search remains the canonical source for city identity; use its name, region, country, coordinates, and slugs consistently.

## Web and Cloudflare/OpenNext

The web app is `apps/web`, built with Next.js and deployed to Cloudflare Workers using `@opennextjs/cloudflare`.

- Cloudflare config is `apps/web/wrangler.jsonc`; do not introduce TOML for this project.
- The worker entry is `.open-next/worker.js`; assets are `.open-next/assets` with the `ASSETS` binding and `nodejs_compat` enabled.
- Never hand-edit `.open-next`; it is generated output.
- Keep secrets out of source and `wrangler.jsonc`.
- For routing or metadata changes, verify home, unknown routes, city routes, `robots.txt`, `sitemap.xml`, and metadata behavior.
- For production-impacting changes, build and preview before deploying. Deploy only when the user’s request authorizes deployment.
- Use the project’s existing web scripts and ordinary HTTP/curl checks for smoke testing; do not assume browser-automation tooling is installed.

Run from `apps/web` when relevant:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
pnpm run preview
pnpm run deploy
```

## Checks and handoff

Shared packages have their own TypeScript projects, including all platform variants. Run `pnpm typecheck` from the root to check all four shared packages and all three apps.

Run the narrowest relevant checks after changes:

```bash
pnpm --filter nativeweather-mobile typecheck
pnpm --filter nativeweather-mobile lint
pnpm --filter nativeweather-macos typecheck
pnpm --filter nativeweather-macos lint
pnpm --filter nativeweather-web typecheck
pnpm --filter nativeweather-web lint
```

Use the package-specific check for the touched target. Root Turbo checks may surface unrelated workspace noise. Do not hide new errors with broad casts, `@ts-ignore`, or disabled lint rules; distinguish pre-existing failures from regressions in the handoff.

Before submitting work for review or approval, report the changed areas, checks run, any pre-existing failures, and any platform or deployment behavior that could not be exercised locally.
