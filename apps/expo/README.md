# NativeWeather mobile

Expo SDK 58 app using Expo Router and Uniwind. The home screen renders the shared
`Button` from `packages/ui/src/Button.tsx` centered on screen.

From the repository root:

```sh
pnpm install
pnpm --dir apps/expo start
```

Use `pnpm --dir apps/expo ios`, `android`, or `web` to launch a platform.

## Checks

```sh
pnpm --dir apps/expo exec expo install --check
pnpm --dir apps/expo exec tsc --noEmit
pnpm --dir apps/expo lint
```
