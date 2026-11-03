# NativeWeather UI

Expo SDK 58 app using Expo Router and Uniwind. This is the UI for mobile,
browsers, and the Tauri desktop shell. Web output is a client-only SPA; Uniwind
resolves the system theme automatically without server-rendered theme state.

From the repository root:

```sh
pnpm install
pnpm --dir apps/expo start
```

Use `pnpm --dir apps/expo ios`, `android`, or `web` to launch a platform.
For desktop development, use `pnpm dev` or `pnpm dev:desktop` instead: Tauri starts
this Expo server itself.

Run `pnpm --dir apps/expo build` to export the web UI to `dist`.

## Checks

```sh
pnpm --dir apps/expo exec expo install --check
pnpm --dir apps/expo exec tsc --noEmit
pnpm --dir apps/expo lint
```
