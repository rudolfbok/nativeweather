---
name: nativeweather-react-native
description: NativeWeather-specific Expo/React Native guidance. Use when changing apps/mobile or shared packages/app UI, hooks, storage, NativeWind theme handling, Expo Router layouts, React Native Web parity, location, maps, widgets, MMKV/Zustand state, or platform-specific files. Prefer small modern syntax and existing project patterns.
---

# NativeWeather React Native

Use this for mobile and shared app changes.

## Project Facts

- Mobile app: `apps/mobile`
- Shared app code: `packages/app`
- Expo SDK: 55
- React Native: 0.83
- React: 19
- Navigation: Expo Router
- Styling: NativeWind/Tailwind plus project styled wrappers
- Storage: MMKV via `packages/app/storage/useStorage.ts`
- Local/shared state: Zustand stores in `packages/app/hooks`
- Web parity: many files have `.web.tsx` variants
- iOS widgets: Expo Widgets configured in `apps/mobile/app.json`

## Commands

Use targeted checks first:

```bash
pnpm run typecheck
```

Run that from `packages/app` for shared code, `apps/web` for web parity, and `apps/mobile` for mobile-only work. Mobile typecheck may expose existing workspace module-resolution noise; separate that from changes made in the current task.

## Style Rules

- Keep code terse and modern.
- Avoid `let`, classes, legacy touchables, and unnecessary wrapper types.
- Do not add `useMemo`, `useCallback`, or `memo` by default.
- Prefer inline local types when they are shorter and still readable.
- Preserve existing wrappers such as `StyledText`, `StyledPressable`, `RoundView`, and existing hook boundaries.
- Use direct functions and focused hooks over broad object-return helpers.

## Platform Rules

- Preserve `.web.tsx`, `.ios.tsx`, `.android.tsx`, and `Platform.OS` splits when behavior differs.
- Keep NativeWind/global theme side effects native-only unless web explicitly needs them.
- Use `ThemeSync.web.tsx` for web DOM theme syncing.
- Guard iOS-only widget/native logic with platform checks.
- Do not edit generated native folders unless the task is explicitly native/prebuild work.

## Data And Storage

- Keep storage defaults centralized in `initStorageDefaults.ts`.
- Use the combined storage hooks from `useStorage.ts`.
- Keep weather source logic centralized; do not duplicate provider branching inside components.
- Persist only actual user preferences or app state that must survive restart.

## Weather Sources

- Treat additional providers as experimental until the user explicitly promotes them to the main product experience.
- Use WeatherAPI search as the canonical source for city name, region, country, coordinates, and resulting slugs. Other providers supply weather data for those coordinates and must not replace the canonical location identity.
- Normalize provider conditions to the existing WeatherAPI condition codes at the adapter boundary. `WeatherIcon` and `useMapConditions` should consume normalized codes without branching on `currentSource`.
- Keep provider selection and response mapping in the API layer. Components may react to normalized capabilities, but should not inspect raw provider payloads.
- Do not ship provider keys in shared client code. Route authenticated provider requests through the project API before production rollout.
- Account for homepage fan-out when testing providers with concurrency or quota limits. Prefer centralized caching or request coordination over provider-specific throttling in UI hooks.

## UI And Performance

- Strings in React Native UI belong inside text components.
- Prefer `Pressable` and native-feeling controls.
- Avoid large dynamic lists in `ScrollView` unless the list is known small/static.
- Keep map components isolated and avoid unnecessary remounts.
- For widgets, keep async update code simple and platform-safe.
