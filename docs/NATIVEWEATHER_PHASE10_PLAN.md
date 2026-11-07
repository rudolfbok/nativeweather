# Phase 10 (rethought): SPA + thin edge worker, no Expo SSR

## Context

The web needs only two things from a server:

1. **City `<title>` / description / OG / canonical in the raw HTML.** Link previews (iMessage, Slack, X, Discord) and crawlers don't run JS.
2. **HTTP 404 for unknown cities**, so the page isn't indexed as a soft 404.

The user's third goal is that `nativeweather.app/prague` loads Prague and fills in the full slug. That is **client-side** behaviour (legacy did it with a client `replace`), and it isn't built yet.

Expo `web.output: "server"` renders the whole React Native tree in the Worker to deliver those two `<head>` items. That cost:

- MMKV server snapshots (the bloated `useStorage.ts` rewrite).
- `+html` constraints, which caused the white page from the missing `ScrollViewStyleReset`.
- Hydration and Tolgee SSR warnings, plus browser-API guards everywhere.
- A second build output just for Tauri (Phase 10B).
- The whole RN render bundle shipped into a Worker.

The page body is client-only anyway (decided earlier), so SSR buys nothing.

**New approach:** keep one `single` SPA export for both web and Tauri. Put a ~60 LOC Cloudflare Worker in front that serves the static assets. For `/<city>` requests it calls the existing pure-TS `fetchWeather`, then uses `HTMLRewriter` to rewrite `<title>` and the meta tags in `index.html` and sets the status to 200 or 404. This is "SSR of the `<head>` only" at the edge. `packages/api` was kept platform-free for this Worker.

This merges Phase 10A and 10B and removes the dual output entirely.

## Undo the server-output work

- `apps/expo/app.json`: `web.output` back to `"single"`.
- Remove `expo-server` (`pnpm --filter @nativeweather/expo remove expo-server`).
- `apps/expo/src/core/database/useStorage.ts`: `git checkout HEAD --` (the thin MMKV wrappers; the SSR rewrite is no longer needed).
- `[city].tsx`: delete `resolveCity`, `loader`, `generateMetadata`, and the `expo-server` / `expo-router/server` / `@/seo` imports.
- `+html.tsx` → **deleted** (changed during implementation). With `web.output: "single"`, Expo never renders `+html.tsx`. The SPA template is `apps/expo/public/index.html` (see `@expo/cli` `webTemplate.js`), and the dev server uses the same file. That template now holds:
  - `<title>NativeWeather</title>` and the site description meta, which the Worker overwrites on city pages.
  - The manifest, icons, preconnects and Umami.
  - The `expo-reset` full-height style. Without it the flex layout collapses into a blank page.
- Delete `apps/expo/src/seo.ts`. Its logic moves into the Worker.

## Keep from 10A

- `apps/expo/public/**`: icons, manifest, `robots.txt`, `sitemap.xml` (`/`, `/compass`).
- Compass page `(tabs)/compass.web.tsx` and the `compass.tsx` redirect, the `openCompass` change, and the phone/tablet `isCompassSupported` check.
- `+not-found.tsx`.

## New: canonical slug on the client (goal 3)

- `[city].tsx`: once `weather` loads, compute `getCityRoute(weather.location)` (from `@nativeweather/api` after the move below). If `city`, `r` or `cr` differ from the URL, call `router.setParams(...)`. `/prague` then becomes `/prague?r=hlavni-mesto-praha&cr=cz` without a reload. This works in browser dev, production and Tauri.
- `[city].tsx` and the Worker share one `reservedSlugs` list from `@nativeweather/api`.

## Where the Worker lives: new workspace `apps/worker`

`~/Projects/nativeweather-api` (a separate repo) stays a pure JSON API: the `WEATHER_API_KEY` secret and CORS `*`, with no assets. A web deploy must never be able to break the API that iOS, Android and Tauri depend on.

The site Worker is a separate workspace package, `apps/worker` (`@nativeweather/worker`), not part of `apps/expo`:

- It needs its own `tsconfig` with Cloudflare `workers-types`. Expo's tsconfig includes `**/*.ts` and the React Native types, and the two would clash.
- It has its own `wrangler` devDependency and `dev`/`deploy` scripts. It doesn't pollute the Expo app, the same pattern as `apps/desktop`.
- It points at the Expo build through `assets.directory: "../expo/dist"`, just as Tauri uses `frontendDist: "../../expo/dist"`.

### Shared pure code → `packages/api`

The Worker must not import from `apps/expo/src`. Move the pure slug helpers into `packages/api/src/utils/` and export them from `@nativeweather/api`:

- `weatherSlug.ts` (`buildSlug`, `getCityRoute`, plus the new `reservedSlugs` list with `search`, `settings`, `compass`, `modals`, `api`, `preview`)
- `countryCode.ts`
- `removeDiacritics.ts`

Update the importers directly, with no re-export from core: `core/utils/index.ts` (drop those lines), `core/utils/alertFilters.ts`, `src/navigation.ts`, `src/ui/utils/shareWeather.ts` and `[city].tsx`.

### `apps/worker` files

- `package.json`: `@nativeweather/worker`, private. Dependency `@nativeweather/api` (workspace). devDependencies `wrangler`, `@cloudflare/workers-types` and `typescript`. Scripts:
  - `dev` = `wrangler dev`
  - `deploy` = `wrangler deploy` (run by the user only)
  - `typecheck` and `lint` matching the other packages
- `wrangler.jsonc`:
  - `name: "nativeweather"`, `main: "src/index.ts"`, `compatibility_date`, `compatibility_flags: ["nodejs_compat"]`.
  - `assets: { directory: "../expo/dist", binding: "ASSETS", not_found_handling: "single-page-application", run_worker_first: true }`. Verify `run_worker_first` and the SPA semantics against the current Cloudflare docs first.
- `tsconfig.json`: `types: ["@cloudflare/workers-types"]`, strict.
- `src/index.ts` (~60 LOC):
  1. `pathname` is `/`, has more than one segment, has a `.`, or is in `reservedSlugs` → `env.ASSETS.fetch(request)`.
  2. Otherwise run in parallel: `env.ASSETS.fetch(new Request(new URL('/', request.url)))` (the SPA `index.html`) and `fetchWeather([city, r, cr].filter(Boolean).join(', '))`.
  3. Found → `HTMLRewriter` sets the `<title>` to `Name (CC) | NativeWeather`, `meta[name=description]`, `link[rel=canonical]` (`buildSlug`), and OG + Twitter with `/preview-image.png` 1200x630. Return 200 with `Cache-Control: public, s-maxage=300`.
  4. Not found → the same HTML with status 404 plus `<meta name="robots" content="noindex">`. The client shows "not found".
- Root `package.json`:
  - `build:web` = `pnpm --filter @nativeweather/expo build`
  - `preview:web` = `pnpm build:web && pnpm --filter @nativeweather/worker dev`

`apps/expo/public/index.html` must contain a default `<title>` and `meta[name=description]` so the rewriter has elements to rewrite. Add canonical, OG and Twitter only in the Worker, with `head.append`. A static canonical in the SPA shell would point every page (`/search`, `/settings`…) at `/`.

## Verify

- `pnpm lint`, `pnpm typecheck`, and prettier on touched files.
- `pnpm dev` in Chrome: home, `/search` and `/compass` render. `/prague` loads and the URL becomes the full slug.
- `pnpm preview:web`, then:
  - `curl` `/prague?r=hlavni-mesto-praha&cr=cz` returns 200 with the city title, description, canonical and OG tags in the raw HTML.
  - `curl` `/zzzznotacity` returns 404 with noindex.
  - `/`, `/robots.txt`, `/sitemap.xml` and `/_expo/...` assets load. A deep refresh of `/settings/units` serves the SPA.
- `grep` confirms no `expo-server` or `generateMetadata` remains.
- Tauri: `pnpm dev:desktop` is unchanged (8081, SPA).
- No deploy and no commit.
