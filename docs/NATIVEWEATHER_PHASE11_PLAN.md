# Phase 11 (final): release review

Revised 2026-11-07. The tree is still uncommitted on `refactor/project-architecture` (HEAD `f48cb72`, "phase 9").
This replaces the Phase 11 prompt in the v3 playbook (§4) and wins wherever the two disagree (see §4 below).

## 1. Where things stand

- **Phase 10** (SPA + edge Worker, `NATIVEWEATHER_PHASE10_PLAN.md`) is implemented and verified.
- **Phase 10.1** (the fixes from the first review, §2) is done and verified.
- **The owner's own changes** (listed below) are in the same tree. Neither plan covered them, so the Phase 11 matrix checks
  them.

### Verified after Phase 10.1

| Check                                                                                                                        | Result                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `pnpm lint`, `pnpm typecheck` (types, api, worker, expo)                                                                     | PASS                                                                                                    |
| `pnpm exec prettier --check .`                                                                                               | PASS                                                                                                    |
| `pnpm build:web`                                                                                                             | PASS (`dist` 8.5 MB; maplibre is its own 1.1 MB chunk; no Umami and valid `http-equiv` in `index.html`) |
| `GET /prague?r=hlavni-mesto-praha&cr=cz`, `/prague`, `/Prague`                                                               | 200, `Prague (CZ) \| NativeWeather`, canonical = full slug, OG/Twitter, `s-maxage=300`, Umami           |
| `GET` + `HEAD /zzzznotacity`                                                                                                 | 404, `noindex, follow`                                                                                  |
| `GET /%E0%A4%A` (malformed)                                                                                                  | 404 not-found page (was 500)                                                                            |
| `GET /Search`, `/SETTINGS`                                                                                                   | 200 SPA shell, not treated as a city (was "Village Of Dorseys Search")                                  |
| `/`, `/settings/units`, `/robots.txt`, `/favicon.svg`                                                                        | 200. HTML pages get Umami from the Worker; other files are untouched                                    |
| Banned greps (contract list minus `clsx`), `STUB(`, `expo-server`, `generateMetadata`, `patches/`, turbo, react-native-macos | PASS                                                                                                    |
| LOC                                                                                                                          | legacy `packages/ui` 295 files / 14.3k → `src/ui` 179 / 9.2k. Whole app 388 / 17.8k → ~276 / ~12.9k     |

Not tested by an agent: `pnpm dev` in Chrome, Tauri dev/bundle, iOS/Android devices, widgets, the new offline state.

### Owner changes outside both plans (checked in the matrix)

- **City screen**: `useCityWeather` no longer writes the shared store. `[city].tsx` writes it on focus, shows the hero only
  once `storeWeather === weather`, rewrites `/prague` to the canonical slug (`router.setParams`), and sets the browser tab
  `<title>` (`expo-router/head`; the root layout resets it). `dangerouslySingular` keeps one city screen, so back always
  goes home.
- **Status screens**: `StatusView`, `ErrorIcon`, `NotFoundIcon`, `SuggestedCities`, `+not-found.tsx`, and `status.*` in all
  7 locales.
- **Tauri desktop**: macOS overlay title bar + drag regions (`core:window:allow-start-dragging`), traffic lights, the
  binary is `NativeWeather` (`mainBinaryName`, `[[bin]]`, `default-run`), `icon.icns` from `apps/desktop/scripts/macos-icon.swift`,
  local weather or the first favourite opens on launch (`useStartupCitySettled`, `replaceWithCity`), a "No city selected"
  home, and content centred at `max-w-4xl`.
- **Wide browser**: a third column (AQI + 9 square metric tiles) at ≥1280 px (`MetricCard column`, `squareDescription`).
- **Compass**: the web route `/compass` (the modal is gone), shown only on phones and tablets.
- Hermes `Intl.Locale` / `Intl.PluralRules` polyfills for ICU plurals; hover/fade styling, dark `modal-background`
  `#121212`, dark search field; `getCityTitle` shared in `@nativeweather/api`; `allowBuilds` esbuild + workerd.

## 2. Phase 10.1: done

| #   | Defect                                                                 | Fix                                                                                                                                                                                                                                                                                                                                                                                                          |
| --- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Malformed URL (`/%E0%A4%A`) → `decodeURIComponent` threw → **500**     | `getCitySlug` returns `null` for an undecodable path, and the Worker serves the not-found page: **404 + noindex**, with no API call. No page can live at such a URL.                                                                                                                                                                                                                                         |
| 2   | Reserved slugs were case-sensitive (`/Search` loaded a US village)     | `reservedSlugs` is private now; `isReservedSlug(slug)` lowercases. The Worker and `[city].tsx` both use it                                                                                                                                                                                                                                                                                                   |
| 3   | `HEAD` skipped the Worker, so `HEAD /zzzznotacity` → 200               | The Worker handles `GET` and `HEAD` alike. Link checkers, crawlers and uptime monitors send `HEAD` to ask whether a page exists, and they now get the same status as a browser.                                                                                                                                                                                                                              |
| 4   | `httpEquiv` (JSX spelling) in `public/index.html`                      | `http-equiv`                                                                                                                                                                                                                                                                                                                                                                                                 |
| 5   | Umami loaded in Tauri (blocked by CSP, console error) and in local dev | Removed from `index.html`. The Worker appends it (with `data-domains="nativeweather.app"`) to every HTML page it serves. Tauri and Metro never see it.                                                                                                                                                                                                                                                       |
| 6   | `apps/worker/.wrangler/` not ignored                                   | `.wrangler/` in `.gitignore`                                                                                                                                                                                                                                                                                                                                                                                 |
| 7   | `pnpm format` would rewrite `ios/`/`android/` Pods                     | `**/ios`, `**/android`, `**/.wrangler` in `.prettierignore`; formatted `WeatherChart.tsx` + docs                                                                                                                                                                                                                                                                                                             |
| 8   | `search.url.error` unused                                              | Deleted from all 7 locales                                                                                                                                                                                                                                                                                                                                                                                   |
| 9   | Tauri min size = default size (1164x786); didn't fit 1280x800 displays | min 1024x640 (default size unchanged)                                                                                                                                                                                                                                                                                                                                                                        |
| 10  | Stale "cities further down the stack" comments                         | Deleted in `[city].tsx` and `useCityWeather.ts`                                                                                                                                                                                                                                                                                                                                                              |
| D1  | Offline showed "Weather not found"                                     | `fetchWeatherResult()` in `@nativeweather/api` (`fetchWeather` wraps it, so every caller is unchanged) says why it failed: no HTTP answer → `offline`, non-OK answer → `notfound`, unreadable body → `error`. `[city]` shows `status.offline` / `status.error` with **Try again** (`retry`, which shows the skeleton meanwhile) and keeps SuggestedCities for not-found. No new dependency or platform code. |
| D2  | `preview.tsx`                                                          | Deleted, along with `preview` in the reserved slugs                                                                                                                                                                                                                                                                                                                                                          |

Known limits, accepted:

- ~~An upstream outage looked like "not found"~~. Fixed 2026-11-07. The proxy (`~/Projects/nativeweather-api`) answers
  WeatherAPI code 1006 with **404**, other failures with **502**, and a missing `q` with 400, and it now URL-encodes `q`.
  The app maps 404 → `notfound` and other failures → `error` (Try again). The Worker returns 404 only for `notfound`; an
  outage gets **503 + `no-store`** with the default `<head>`. **The proxy must be deployed before the site and app**:
  the old proxy's 500 for an unknown city now reads as "There was an error" / 503.
- `/Search` gets a 200 shell from the Worker, while the client shows Unmatched.

## 3. Decisions (made 2026-11-07)

1. Real offline state: **done** (D1).
2. `preview.tsx`: **deleted** (D2).
3. `clsx`: **kept**. It's the class-joining tool here; `twMerge` isn't supported. Removed from the contract's BANNED list.
4. `isTauri()`: **fine**. The v3 rule 9 said "never for layout", meaning the browser and the desktop should share one
   responsive layout. The desktop app is now deliberately its own shell (sidebar, centred width, two-column settings,
   DesktopHome), so the rule becomes: _`isTauri()` for the desktop shell and its layout, and for features that need the
   host. Phone versus browser layout stays on breakpoints._
5. EAS `projectId c5d2c429-c300-4585-8558-13717e205496` / owner `rudyxsides`: **confirmed**.
6. Merging/cutover: **not now**. Phase 11 doesn't propose a merge.

### Two small items left to the owner

- **Root `AGENTS.md`** (done 2026-11-07): added under Architecture:
  `- apps/worker — Cloudflare Worker for nativeweather.app: serves the Expo web export and rewrites city <head> tags (title, description, canonical, OG) and 404s. Run with pnpm preview:web.`
- **`SuggestedCities` labels** are English ("Prague", "New York", …). Keep them (city names), or translate them via locale
  keys. Decided 2026-11-07: keep.

## 4. Corrections to the v3 playbook

- `packages/core` / `packages/ui` no longer exist: they are `apps/expo/src/core` / `apps/expo/src/ui` (`@/core`, `@/ui`).
- Locked decision 10 (Expo `server` output) is replaced by the Phase 10 plan. Phase 10B no longer exists.
- Contract BANNED list: no `clsx`. Locked rule 9 is amended as in §3.4.
- Phases 3.5–10.1 are done.

## 5. The Phase 11 prompt (paste after the §3 Contract)

```text
PHASE 11: FINAL RELEASE REVIEW. Step 1 = dead-code prune (small, after "go"), Step 2 = read-only review.

Context: read docs/NATIVEWEATHER_PHASE11_PLAN.md first. It supersedes the v3 playbook where they
disagree (packages/ui|core → apps/expo/src/ui|core; SPA + apps/worker, no Expo server output;
clsx allowed; isTauri() allowed for the desktop shell). The tree is intentionally dirty
(Phase 10, 10.1 and owner changes, uncommitted): do NOT stop on a dirty git status and revert nothing.

STEP 1: PRUNE (Step A list first, then STOP for "go").
Run `pnpm dlx knip` (report the raw output), plus a locale-key usage check.
Known: preview.tsx is deleted, so ~60 `@/ui` barrel exports are used only inside ui
(e.g. Separator, Switch, Skeleton, moon-phase icons, ErrorIcon, NotFoundIcon,
levelBgClass) and DotIndicator has no importer at all.
Allowlist: apps/expo/src/ui/index.ts (drop exports no file outside ui imports),
files with zero importers, unused locale keys in all 7 locales, unused dependencies in
package.json files (show list first; remove with pnpm). Never delete a file that is
imported, a route file, or anything in apps/desktop, apps/worker or packages/types.
Checks: prettier on touched files, pnpm lint, pnpm typecheck, pnpm build:web.

STEP 2: READ-ONLY RELEASE REVIEW (no edits).
Matrix PASS / FAIL / NOT TESTED + proof. Columns: iOS, Android, Chrome (desktop + phone
width), Tauri macOS (dev + `pnpm build` bundle), Tauri Win/Linux (NOT TESTED unless available):
- weather data; not-found (+ suggested cities); offline (DevTools offline / airplane mode)
  → "You're offline" + Try again recovers; refresh + toast
- /prague → URL becomes the full slug; tab title follows the city and resets on leaving
- favourites + persistence across restart/refresh; search + recents; HeaderSearch dropdown
- forecast 3/7/14, chart scrub, every metric modal, AQI EU/US + 6 pollutants, alerts list+detail
- settings: theme, language (all 7; ICU plurals on Hermes, e.g. alerts.count), temperature,
  units, aqi; About links via opener in Tauri; feedback send
- wide browser ≥1280 px third column; Tauri centred max-w-4xl; window min 1024x640
- Tauri: overlay title bar drag, traffic lights, launch opens local weather / first
  favourite, "No city selected" after going home, geolocation prompt in the bundle,
  Dock/menu name "NativeWeather", icon shape, CSP console clean (no Umami)
- maps (web/Tauri); compass (phone browser only, hidden on desktop + Tauri)
- iOS widgets (4) update; Android adaptive icon; deep link nativeweather://
- [city] singular: city → city → back lands home; modals over a city show that city
- (tabs)/compass.tsx on native: no stray tab, no router warning
- Worker (pnpm preview:web, then curl; stop wrangler after):
  GET /prague?r=hlavni-mesto-praha&cr=cz and /prague → 200, city title, canonical full slug, OG
  GET + HEAD /zzzznotacity (after the proxy deploy), GET /%E0%A4%A → 404 + noindex
  GET /Search → 200 shell, not a city
  /, /search, /settings/units, /compass, /robots.txt, /sitemap.xml, /_expo/… → 200;
  Umami only in HTML responses
Greps: contract banned list (minus clsx), STUB(, expo-server, generateMetadata, preview,
react-native-macos, next, turbo, solito, nativewind, patches/.
Report legacy → new files + LOC (legacy packages/ui 295/14.3k; whole app 388/17.8k).
Report a deploy checklist only (execute nothing): `pnpm build:web` then
`pnpm --filter @nativeweather/worker deploy` replaces the legacy `nativeweather` worker; confirm
the nativeweather.app route/custom domain; nativeweather-api stays untouched; rollback =
`wrangler rollback`. No merge or cutover plan (owner decision).
Then STOP. Never commit, push, deploy or touch GitHub.
```
