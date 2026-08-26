---
name: nativeweather-react-native
description: NativeWeather guidance for shared React Native code, the Expo mobile app, the React Native macOS app, and their web variants. Follow the repository's existing simple style and keep changes narrowly scoped.
---

# NativeWeather React Native

Use this skill when changing `packages/app`, `apps/mobile`, or `apps/desktop`, including shared UI, hooks, storage, NativeWind styles, Expo Router screens, maps, location, widgets, and platform-specific files.

## Current project

- This is a pnpm/Turbo monorepo.
- Shared UI and logic live in `packages/app` and are imported as `app/*`.
- `apps/mobile` is Expo SDK 57 with React 19.2, React Native 0.86, Expo Router, NativeWind 4, MMKV, Zustand, MapLibre, and Expo Widgets.
- `apps/desktop` is the React Native macOS app. macOS-specific files and navigation are active product code, not examples.
- `apps/web` is a separate Next.js app that reuses much of `packages/app` through React Native Web.
- Platform files in use include `.web.tsx`, `.macos.tsx`, `.android.tsx`, and `.ios.tsx`.
- Styling uses NativeWind/Tailwind, `clsx`, and project wrappers such as `StyledText`, `StyledPressable`, `RoundView`, and `ScreenWrapper`.
- Persistent settings and small app data use MMKV through `packages/app/database/useStorage.ts` and related files in `packages/app/database`.
- Shared transient state uses small Zustand stores in `packages/app/hooks`.
- Weather requests go through the project API worker and are normalized by the API layer before UI code consumes them. The currently configured weather source is WeatherAPI.

## Code style: hard boundaries

Generated code must look like the existing code: short, direct, and easy to scan. Prefer the smallest change that solves the stated problem.

- Do not invent an architecture, service layer, design system, generic utility, repository pattern, or abstraction for a one-off need.
- Do not add a hook, component, helper, type, enum, constant, or file unless it removes real duplication or keeps the current file clearly simpler.
- Do not overtype. Type props and public data boundaries; use inference for local values, callbacks, simple objects, and obvious return values. Do not add generic types merely to demonstrate strictness.
- Keep local types next to the code that uses them. Do not create a shared type for a single component.
- Prefer a short function or inline expression over a wrapper whose only job is forwarding props or renaming a value.
- Prefer early returns and straightforward branches. Avoid nested configuration objects and clever functional code when an ordinary `if` is clearer.
- Do not add `useMemo`, `useCallback`, `memo`, reducers, context, or a state machine by default. Add one only for a demonstrated correctness or performance need.
- Do not add comments that restate the code. Comment only non-obvious platform, API, or product constraints.
- Do not refactor nearby code just because it could be styled differently. Keep unrelated churn out of the diff.
- Match the repository formatting: tabs, semicolons, single quotes, trailing commas, and roughly 120-column lines. Run Prettier when formatting is part of the change.
- Do not use `let` when `const` or a direct expression works; mutable module state is a valid exception. Avoid classes and legacy touchables.
- Use `async`/`await` directly. Do not use `void` to hide a promise unless a real framework callback boundary requires it.
- Use the existing Zustand and MMKV hooks. Follow the surrounding store access pattern; do not introduce a new state-access abstraction.

When choosing between two correct implementations, choose the one with fewer lines, fewer concepts, fewer files, and less indirection. Do not add defensive handling for impossible states or hypothetical future providers without evidence in the task.

## Existing patterns

- Preserve `app/*` imports and the current folder boundaries: API code in `api`, persistence in `database`, stateful behavior in `hooks`, reusable UI in `components`, and screens/features in `features` or the app route.
- Reuse existing styled wrappers and constants before reaching for raw styles or a new wrapper.
- Use `className` with NativeWind. Use `clsx` when classes are conditional or already use it in the file. Use `style` only for values that genuinely need runtime objects, such as colors, cursor behavior, or platform APIs.
- Keep visible strings inside `StyledText` or another text component. Use Tolgee translations for user-facing copy when the surrounding feature is translated.
- Keep event handlers near the component that owns them. Move behavior into a hook only when it is reused or makes a large screen easier to read.
- Follow the surrounding file's component style. Both `export const Component = () =>` and Expo Router's `export default function Screen()` are valid existing patterns; do not rewrite one into the other without a reason.

## Platform boundaries

- Check all relevant variants before changing shared behavior. Preserve `.web`, `.macos`, `.android`, and `.ios` overrides when behavior or layout differs.
- Keep web-only DOM behavior in `.web.tsx` files. Use `ThemeSync.web.tsx` for web theme synchronization.
- Keep macOS navigation and desktop-specific layout in the existing macOS hooks/files; do not force mobile navigation assumptions onto macOS.
- Keep native-only theme, storage, location, map, and widget behavior out of the web bundle unless the web implementation explicitly needs it.
- Use `Platform.OS` for small runtime differences; create a platform file when the implementation or layout is substantially different.
- Do not edit generated `ios`, `android`, or build output folders unless the task explicitly concerns native/prebuild configuration.

## Data, weather, and storage

- Keep MMKV defaults in `packages/app/database/initStorageDefaults.ts` and use the existing hooks from `database/useStorage.ts`.
- Persist actual user preferences or app state that must survive a restart. Do not persist derived weather data without an existing product reason.
- Keep provider selection, authenticated requests, error handling, and response mapping in `packages/app/api`.
- UI components consume normalized weather data. They must not branch on raw provider payloads or duplicate provider mapping.
- WeatherAPI search is the canonical source for city identity: name, region, country, coordinates, and slugs. Other weather data must use those coordinates and must not replace that identity.
- Do not put provider secrets in shared client code. Requests requiring secrets go through the project API worker.
- Treat new providers as experimental until explicitly promoted. Do not build provider-specific abstractions in anticipation of them.
- Respect abort signals and existing request coordination in location, search, weather, maps, and widgets. Do not add per-component throttling or duplicate caching without checking the existing flow.

## UI and performance

- Use `Pressable` or the existing `StyledPressable` for interactions. Keep touch targets usable on mobile and pointer/hover behavior appropriate on web and macOS.
- Use `FlatList`/`SectionList` for lists that can become large. A small, fixed set of cards may remain in a `ScrollView`.
- Keep map components isolated and avoid remounting them because unrelated screen state changed.
- Keep widget code small, serializable, platform-safe, and consistent with the existing `expo-widgets` components.
- Do not optimize by guesswork. First identify the actual rerender, remount, request, or list-size problem.

## Checks

Run the narrowest relevant checks after a change:

```bash
pnpm --filter app typecheck
pnpm --filter nativeweather-mobile typecheck
pnpm --filter app lint
```

Use the package-specific command when possible. `pnpm typecheck` runs Turbo across the workspace and can expose unrelated existing resolution noise. For web or macOS-only changes, also run that app's available `typecheck`/`lint` script. Do not hide new errors behind broad casts or `@ts-ignore`; fix the cause or report a pre-existing error precisely.
