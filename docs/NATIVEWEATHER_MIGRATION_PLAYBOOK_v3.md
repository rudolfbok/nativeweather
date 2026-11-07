# NativeWeather — Migration Playbook v3 (lean, debloating)

**Source (read-only):** `/Users/rudolfbok/Projects/nativeweather-legacy` (branch `main`, `2ec8c99` = `origin/main` in the destination repo)
**Destination:** `/Users/rudolfbok/Projects/nativeweather`, branch `refactor/project-architecture`
**Revised:** 2026-11-05, after Phases 0–3. Replaces v2.

## 0. How to use

1. Open a fresh agent session per phase (or per Phase 6 slice).
2. Paste **§3 Contract** + **one** phase prompt from §4. Never the whole file.
3. The agent replies with a **triage table only** (Step A). Review it, cut more, reply `go`.
4. The agent executes (Step B), reports, stops. You test, then commit yourself.

The goal is not "port everything". It is **port behaviour, delete structure**. Target: legacy `packages/ui` 324 files / ~14.3k LOC → about 225 files / ~10k LOC.

---

## 1. Status and ground truth (verified 2026-11-05)

| Phase | State |
|---|---|
| 0 Baseline | done |
| 1 MMKV web spike | done (smoke screen still in `apps/expo/src/app/index.tsx`) |
| 2 Types + API | done |
| 3 Core + locales | done **with defects** → fixed in Phase 3.5 |
| 4 → 11 | not started |

Baseline: `pnpm lint` and `pnpm typecheck` pass. `packages/ui` has no `typecheck` script, so it is only checked through `apps/expo` imports.

Defects found in the Phase 1–3 output:

| Defect | Where | Effect |
|---|---|---|
| Storage hooks lost default resolution; settings no longer seeded | `packages/core/src/database/useStorage.ts`, `initStorageDefaults.ts` | Fresh install: units resolve to imperial, temperature to Celsius. `stringStorageDefaults` is dead. |
| App cannot resolve core | `apps/expo/package.json` lists only `@nativeweather/ui` | Phase 5 would fail to import core/api/types |
| Vacuous test script | `packages/core` `test` → `tests/*.test.cjs`, no `tests/` dir | Phase 3 test deliverable not met |
| Carried-over bloat | dead fields, dead try/catch, debug helpers, duplicated stores and location hooks | See Phase 3.5 |
| Gratuitous renames | `useSunEventCountdown`→`useSunEvent`, `createWeatherDataUpdater`→`createWeatherUpdater` | Breaks 1:1 imports when porting UI |
| Style drift | core/api use tabs + single quotes; Phase 1 / `Button` / `apps/expo` use spaces + double quotes | No formatter configured |
| Dirty tree | `packages/ui/src/useThemeColors.ts` (untracked), `packages/ui/src/index.ts` | Copies `theme.css` hex values by hand; Uniwind already has `useCSSVariable` |
| `Button` text colour | `packages/ui/src/Button.tsx` uses `text-label` on blue | Black text on blue in light mode; `--color-ui-foreground` exists unused |
| Stale installs | `node_modules/.pnpm` holds `expo@57` leftovers the lockfile no longer references | Run `pnpm install` once |

### Corrections to v2

1. `packages/types|api|core` are no longer "empty skeletons". Empty routes/stubs are fine; they get populated by the end.
2. "Tolgee already migrated" was false. `@tolgee/react` + `@tolgee/format-icu` are **mandatory** and get ported in Phase 5. The legacy provider returns `null` until mounted — the new one must render synchronously from the static locale data (SSR).
3. The legacy status-aware `fetchWeatherAPIOrThrow` is gone. **Keep the simplified fetch** of this monorepo (returns `null` on failure). Phase 10A maps `null` → HTTP 404. Accepted trade-off: an upstream 5xx also shows as 404.
4. Legacy web never server-rendered the page body (`ClientOnly` + Tolgee `null`); only `<head>` metadata was server-side, and canonical correction was a client `router.replace`. Weather data in initial HTML is **new scope**. Metadata uses Expo `generateMetadata()`.
5. v2 Phase 9 allowlist missed `packages/ui` (widget files, `useWidgets`, PNGs, `@expo/ui`, `expo-asset`). Fixed below.
6. Theme colours in JS come from Uniwind `useCSSVariable`, never from a hex-copying hook.
7. Identity is **`com.bitwebs.nativeweather`** everywhere (overrides v2 rule 11). If `com.rudyxsides.nativeweather` was ever published to a store, this is a new app identity.
8. `apps/expo/AGENTS.md` (stock Expo file) says `npx`/`bunx`/`yarn`. Only those runner references change to pnpm; nothing else in it changes. Root `AGENTS.md` is untouched.
9. URLs: route groups don't appear in URLs, so legacy `(home)/index` and `(search)/index` both resolve to `/`, and static routes shadow city slugs (`/about`). Use explicit `/search`, `/settings/*` and a reserved-slug list for `/[city]`.

---

## 2. Decisions

### Locked

1. No merge/rebase/cherry-pick of legacy. Read only, selective porting.
2. `apps/expo` is the one UI app for iOS, Android, Web and Tauri. `apps/desktop` is only the Tauri shell. Packages: `types`, `api`, `core`, `ui`.
3. No RN macOS, Next.js, Turbo, stmux, Solito, NativeWind, `cssInterop`, `tailwind.config.js`, `_dark` aliases, `macos:` variants, `.macos.*` files, legacy patches.
4. One Metro server on 8081 (`pnpm dev`); `pnpm dev:desktop` attaches Tauri to it.
5. Uniwind + Tailwind 4, CSS-first tokens in `packages/ui/theme.css`. JS reads tokens via `useCSSVariable`.
6. **MMKV V4 is the single storage layer on every platform**, Web and Tauri included. Browser and Tauri have separate origins (no shared data). No fallback layer.
7. `@tolgee/react` is the i18n layer.
8. MapLibre is Web/Tauri only (`.web.tsx`); mobile has no map for now.
9. `isTauri()` from `@tauri-apps/api/core` only when a feature truly needs the host — never for layout.
10. Public web: Expo `web.output: "server"` on Cloudflare Workers (`expo-server/adapter/workerd`), `loader` + `generateMetadata()`. Tauri packages a `single` export of the same app.
11. Identity: `com.bitwebs.nativeweather` (iOS bundle id, Android package, Tauri). App Group `group.com.bitwebs.nativeweather`; widget extension `com.bitwebs.nativeweather.ExpoWidgetsTarget`.
12. Formatter: Prettier with the legacy style (tabs, single quotes, width 120).
13. You commit. Agents never commit, push, deploy or touch GitHub.

### Still owed (each has a default; nothing blocks)

| Question | Default if unanswered |
|---|---|
| EAS `projectId` `c5d2c429-c300-4585-8558-13717e205496` / owner `rudyxsides` still right? (projectId changed 2026-10-31) | Carry both over, re-confirm in Phase 9 |
| URL scheme `mobile` or `nativeweather` | `nativeweather` |
| Umami analytics (`data-website-id 456c4be6-…`) | Keep, one script tag |
| Sitemap with city URLs? | Static: `/`, `/compass` |
| Toasts: `sonner` (web) + `sonner-native`, or one | Keep both until Phase 4 tests sonner-native on web |
| Chart: `react-native-chart-kit` unpatched, or ~120 LOC custom SVG | Unpatched chart-kit |
| Canonical fix: server 301, or tag + client `replace` | Tag + client `replace` (legacy) |
| City page `Cache-Control` | Short `s-maxage` via `setResponseHeaders` |

---

## 3. Contract — paste before every phase prompt

```text
You are migrating NativeWeather. Destination: /Users/rudolfbok/Projects/nativeweather
(branch refactor/project-architecture). Legacy reference, READ-ONLY:
/Users/rudolfbok/Projects/nativeweather-legacy (fallback: git show origin/main:<path>).
Read root AGENTS.md and apps/expo/AGENTS.md first.

FLOW
- Step A (no edits): confirm branch + clean `git status --short` (dirty → STOP).
  Output a triage table of every legacy file in scope:
  KEEP | RESTYLE | MERGE→<target> | REWRITE | DROP, one-line reason each,
  plus expected destination files and LOC (legacy in → new out). Then STOP.
- Step B (only after I reply "go"): edit only the phase allowlist.

DEBLOAT RULES
- Port behaviour, not structure. Deleting beats porting. Prefer one data-driven
  component over N copies. No wrapper that only renames or re-exports.
- Components read stores/hooks instead of drilling 10+ scalar props.
- No placeholder/null components except tagged `// STUB(phase-X)` stubs where
  the phase allows them.
- Comments only for non-obvious "why". No JSDoc on obvious code. No speculative
  tests, adapters, fallbacks or compatibility shims.
- Inside packages/ui use relative imports, never `@nativeweather/ui/...`.
- Theme colours: Tailwind classes; in JS only `useCSSVariable`. No hex copies of
  theme.css tokens.

BANNED (grep before reporting, must be zero in touched files):
clsx, nativewind, cssInterop, _dark, macos, .macos., 'use client', next/,
solito, @ts-ignore, @ts-expect-error, console.log, `: any`, commented-out code.

TOOLING
- pnpm only (`pnpm exec expo install <pkg>` inside apps/expo). Never npm/npx/yarn/bun.
- No dependency up/downgrades, no patches, no identifier changes unless the phase says so.
- Before reporting run: prettier on touched files, `pnpm lint`, `pnpm typecheck`.

REPORT: Scope / Triage outcome (files+LOC in→out) / Changes / Checks run vs not run /
Manual tests for me / Blockers / `git status --short` + `git diff --stat`.
Then STOP. Never commit, push, deploy or start the next phase.
```

---

## 4. Phase prompts

### Phase 3.5 — Stabilize and debloat Phases 1–3

Pre-flight (you, before pasting): discard or stash `packages/ui/src/useThemeColors.ts` and the `packages/ui/src/index.ts` edit; run `pnpm install`.

```text
PHASE 3.5: STABILIZE + DEBLOAT THE PHASE 1–3 OUTPUT. No new features.

Allowlist: packages/{types,api,core}/**; packages/ui/package.json; apps/expo/package.json;
apps/expo/src/app/**; apps/expo/AGENTS.md; apps/expo/app.json (PROPOSE diff, apply
after my OK); root package.json, .gitignore, .prettierrc, .prettierignore;
apps/desktop/src-tauri/tauri.conf.json (only the --filter package name).
Do NOT touch root AGENTS.md or pnpm-workspace.yaml.
Out of scope: SSR changes to storage hooks, any fetch refactor (keep the simplified
fetch exactly as is), restoring legacy fetchWeatherAPIOrThrow.

1. Storage defaults: useStorageString/useStorageBoolean return `value ?? default` from
   storageDefaults.ts (as legacy did). Remove the dead seeding + false comment in
   initStorageDefaults.ts and the ad-hoc `= booleanStorageDefaults.x` patches.
2. apps/expo deps: @nativeweather/{core,api,types} (workspace:*), expo-location,
   expo-dev-client. Scripts ios/android → `expo run:ios` / `expo run:android`.
   Keep react-native-mmkv + nitro in apps/expo.
3. Replace the Phase-1 smoke screen with a tiny core-backed harness: toggle one
   favourite + one setting (units), both persisted. Delete the smoke MMKV instance.
   Delete core's vacuous `test` script (no harness exists).
4. Delete dead code: types carbon_monoxide, condition.text (+ text:'' in the mapper),
   `| null` on code, dailyWillItSnow, avgHumidity; getFavoritesStorageInfo; dead
   try/catch + double warns in crudMMKVService.ts; dead catch in the weather updater;
   redundant write in useFavoriteCityWeather.ts; commented code in formatTime.ts.
5. Location: merge useLocation.ts + useLocation.web.ts into one shared hook with a
   per-platform getCoordinates() (.web.ts for browser). Clear the 15s timeout. Drop
   the dead 'server' error kind and the macOS regex in locationError.ts.
6. Collapse useWeather + useLocalWeather into one createWeatherStore(). Revert the
   renames: useSunEvent→useSunEventCountdown, createWeatherUpdater→createWeatherDataUpdater.
7. Hoist the countryCode map to module scope; airQuality.ts → one threshold table;
   one shared diacritics helper for normalizeSlug + normalizeArea.
8. core package.json exports: add "./utils" and "./locales" subpaths (pure code, no
   MMKV/Nitro/expo-location) for the future Worker.
9. packages/ui: add `typecheck` script + typescript devDependency.
10. Hygiene: root package.json → private:true, drop main/keywords/author/ISC/empty
    description; .gitignore → drop .turbo and the stray `example` line;
    rename apps/expo package nativeweather-mobile → @nativeweather/expo and update
    root scripts + tauri beforeBuildCommand filter.
11. apps/expo/AGENTS.md: replace every npx / bunx / yarn command with the pnpm
    equivalent (pnpm exec / pnpm dlx). Remove the "use bunx if bun.lock" sentence.
    Change NOTHING else in that file.
12. app.json (show old→new first): name "NativeWeather", slug "nativeweather",
    ios.bundleIdentifier + android.package "com.bitwebs.nativeweather",
    expo-location plugin, NSLocationWhenInUseUsageDescription
    "NativeWeather needs your location to show the local weather forecast.".
    Scheme: ask me. EAS/App Group/widgets/icons stay for Phase 9.
13. Prettier: .prettierrc = legacy (useTabs, singleQuote, printWidth 120,
    trailingComma es5, prettier-plugin-tailwindcss; tailwindFunctions ["twMerge"],
    tailwindStylesheet ./apps/expo/src/global.css). Add prettier +
    prettier-plugin-tailwindcss as root devDependencies and a root `format` script.
    Format all source LAST, report it as a separate diff so I commit it alone.
    Ignore: pnpm-lock.yaml, **/uniwind-types.d.ts, src-tauri/target, src-tauri/gen, dist.

Acceptance: lint + typecheck pass; web harness persists favourite + units across
refresh; fresh storage shows metric; no import of a deleted symbol remains.
```

### Phase 4 — UI foundations

```text
PHASE 4: UI FOUNDATIONS ONLY (no weather screens).
Allowlist: packages/ui/**; apps/expo/src/global.css; apps/expo/src/app/index.tsx
(preview screen); packages/core/src/utils/mappings/{airQuality,alertSeverity,landscapeColors}.ts.

Legacy refs: packages/ui/tailwind.config.js, packages/ui/src/constants/*,
packages/ui/src/components/common/{styled,layout,loading,modal,notifications}/**,
packages/ui/src/utils/notifications/**, apps/web/globals.css (web-only CSS).

1. theme.css: add only the missing tokens from Appendix A (modal background,
   hairline/separator, skeleton, scrim, favourite, chart blue, system accents,
   xs breakpoint if StyledText needs it). Keep existing tokens.
2. Semantic colour ownership: core mappings return a level/key
   ('good'|'fair'|…, severity, landscape key), never hex or class strings. ui maps
   level → token class (or useCSSVariable for APIs that need a colour value).
3. Primitives (merge legacy variants into one file each, web/native via classes):
   Text (type variants), Pressable, RoundView/Card, Separator, Switch, Button (fix
   text colour → text-ui-foreground), CardHeader, ContentRow, ScreenWrapper,
   Skeleton/CardSkeleton (CSS-friendly pulse, no reanimated if avoidable).
   Card.ios.tsx (glass) only if expo-glass-effect works without cssInterop — else drop.
4. Modal + toast primitives: StyledModal, ModalHeader (+ .ios), ModalScrollView,
   ValuesList, ModalValueItem; one showToast API (sonner web / sonner-native).
5. Drop: clsx (plain className; twMerge only when merging caller classes), every
   .macos file, ThemeSync.web, useThemeColors(.web), AnimatedView(.web), gsap,
   useRouter variants, TypographyTest, LoadingIndicator.
6. Wrap third-party components needing className with `withUniwind` (verify per lib).
7. Temporary preview screen in apps/expo index: every primitive, light + dark.
Budget: ≤ 25 destination files. Report legacy vs new LOC.
Acceptance: preview correct in Chrome light/dark, iOS/Android dev build, phone width.
```

### Phase 4B — Icons and artwork

```text
PHASE 4B: STATIC ASSETS (mostly port-as-is SVG).
Allowlist: packages/ui/src/components/{icons,landscapes}/**,
packages/ui/src/utils/mappings/{weatherIcons,landscapes}.tsx, packages/ui package.json.
Legacy: packages/ui/src/components/icons/{ui,main,weather,moonphases}/**,
packages/ui/src/components/landscapes/**, the two mapping files.

- Install react-native-svg via `pnpm exec expo install` (no patch).
- Replace the colour-passing lucide wrapper icons (Alert/Clouds/Moon/Rain/Snow/UV/Wind,
  Check/Chevron/Close) with lucide + withUniwind directly at call sites or one Icon helper.
- Icons take colour via className/currentColor, not useThemeColors.
- Drop: icons/weather/freezingstorm/*, icons/settings/{OpenMeteoIcon,WeatherAPIIcon},
  any icon with no importer. Leave settings/logos/maps icons for their phases.
Acceptance: temporary gallery renders every condition code day/night and all landscapes
on web + native.
```

### Phase 5 — Expo Router shell and providers

```text
PHASE 5: ONE ROUTER TREE + PROVIDERS. Stubs allowed (tag `// STUB(phase-6)`).
Allowlist: apps/expo/src/app/**, apps/expo/src/providers/**, apps/expo/package.json,
packages/ui/src/provider/** (if Tolgee provider lives in ui).
Legacy: apps/mobile/app/**, apps/web/app/layout.tsx, packages/ui/src/provider/TolgeeProvider.tsx,
packages/ui/src/utils/initTheme.ts.

1. Providers: Tolgee (@tolgee/react + @tolgee/format-icu, static data from
   @nativeweather/core/locales, language from MMKV `currentLang`, render
   synchronously — no mounted-gate, no ja-JP leftovers); theme: Uniwind.setTheme ↔
   `currentTheme` (system/light/dark); storage init; safe-area; toaster.
2. URLs (explicit, no group collisions):
   /                    home
   /search              search
   /settings, /settings/[option]   (theme|language|temperature|units|aqi in one route)
   /settings/about
   /[city]?r=&cr=       weather; reserved slugs: search, settings, compass, modals, api
   Native tabs on iOS (NativeTabs), JS Tabs only where Android needs it.
3. Do not create the modal routes yet; they arrive with their cards in Phase 6.
4. No browser APIs at module scope (future SSR).
5. Verify early: does an Expo Router modal route render acceptably on web? Report.
Acceptance: tab + back navigation on device; direct load + refresh of /search,
/settings/units, /peshawar?r=north-west-frontier&cr=pk in Chrome; same in Tauri;
language and theme switches persist.
```

### Phase 6 — Weather UI, one slice per session

```text
PHASE 6, SLICE <ID>: <name> (see slice table). One slice per session.
Allowlist: the slice's destination paths, their route files in apps/expo/src/app/**,
and pure-logic moves into packages/core when the slice table says so.
Remove every `STUB(phase-6)` this slice replaces. Mobile and web share one
responsive component unless a real platform difference exists.
Acceptance: the slice's check + side-by-side screenshots mobile / Chrome.
```

| ID | Slice | Legacy sources (packages/ui/src unless noted) | Shape of the result | Check |
|---|---|---|---|---|
| 6.1 | Current + hourly | components/weather/main/*, components/weather/hourly/*, components/weather/SmartSummary.tsx, hooks/conditions/* | One `MainWeather` (merge native/web), SmartSummary rules → core | Units toggle changes values |
| 6.2 | Daily list | components/weather/daily/{DailyForecast,DaysToggle}.tsx | `useSelectedDay` store in core | 3/7/14-day toggle |
| 6.3 | Charts | components/weather/WeatherChart.tsx, utils/getChartDomain.ts, hooks/weather/* (useChartDay) | chart-kit unpatched; date/domain logic → core | Scrub + tooltip web/native |
| 6.4 | Cards + metric modals | components/cards/**, components/weather/daily/DailyForecastMain.tsx, apps/mobile/app/modals/* | One config-driven `MetricCard` + one `modals/[metric]` route + registry `{component, icon, titleKey, usesDate}`; no useModalNavigation | Every card opens its modal on all platforms |
| 6.5 | Air quality | components/airquality/**, components/weather/GradientScale.tsx, apps/mobile/app/modals/airquality/* | One `PollutantDetail` + threshold table + `modals/airquality/[pollutant]` | EU/US toggle, 6 pollutants |
| 6.6 | Alerts | components/alerts/**, core alertFilters | Severity styling in ui; route param = stable id, not array index | List + detail |
| 6.7 | Hero + weather screen | components/weather/hero/*, features/weather/screen.tsx | One responsive hero (`md:`/`xl:`), RefreshControl instead of PullIndicator | Full page all targets |
| 6.8 | Home, favourites, search | components/weather/{card,home,search}/**, hooks/search/useSearchController.ts, features/{home,search}/* | Search/debounce flow → core; toasts via callbacks, not wrapper hooks | Add/remove favourite, search, recents |
| 6.9 | Settings, about, feedback | components/settings/**, components/icons/{settings,logos}/**, features/{settings,about,feedback}/*, utils/shareWeather.ts | Generic option list for 5 selectors; version from expo-constants only; one feedback route | All selectors persist |

### Phase 7 — Desktop shell, compass, Tauri production config

```text
PHASE 7: RESPONSIVE DESKTOP + COMPASS (web) + TAURI CONFIG.
Allowlist: packages/ui layout/shell files, apps/expo/src/app/** (compass route),
apps/expo/package.json, apps/desktop/src-tauri/{tauri.conf.json,capabilities/**,src/lib.rs,
Cargo.toml,icons/**} — show each Tauri diff before applying.
Legacy (reference only): apps/desktop/app/{Layout,Sidebar,Screens}.tsx,
packages/ui/src/components/common/layout/Header.web.tsx, packages/ui/src/features/compass/screen.web.tsx.

1. Sidebar layout (local weather + favourites beside content) via breakpoints, shared
   by browser and Tauri. No second screen copy, no isTauri() for layout.
2. Compass: port features/compass/screen.web.tsx as a web-only route /compass.
   Feature-detect DeviceOrientation; hide entry point where unsupported (incl. Tauri).
3. Tauri: productName/title "NativeWeather", identifier com.bitwebs.nativeweather,
   window ~1125x789 with min size, overlay title bar if supported, explicit CSP
   (connect-src: nativeweather-api.bitwebs.workers.dev, nativeweather-email.bitwebs.workers.dev,
   air-quality-api.open-meteo.com, tiles.openfreemap.org, weathermaps.weatherapi.com;
   worker-src blob:; img-src data: blob:; dev ws://localhost:8081), remove `greet`,
   keep opener scoped to the About-screen links, icons from the 1024 app icon,
   macOS location usage string + entitlement.
Acceptance: browser and Tauri resize correctly; geolocation prompt in bundled Tauri;
iOS/Android unaffected.
```

### Phase 8 — MapLibre (Web/Tauri)

```text
PHASE 8: PORT THE WEB MAP ONLY.
Allowlist: packages/ui/src/components/maps/**, packages/ui/src/components/icons/maps/**,
packages/core/src/constants/weatherMap.ts, packages/core/src/hooks/maps/**, manifests.
Legacy: packages/ui/src/components/maps/** (*.web.tsx only),
packages/core/src/constants/weatherMap.ts, packages/core/src/hooks/maps/useMapWeatherPoint.ts.

- Dynamic `maplibre-gl` import + CSS; MapLibre overrides go to web-scoped global.css.
- useMapWeatherPoint on the current fetchWeather; pass labels, not t() calls, into core.
- Drop: MapLibreView.macos, react-native-webview, expo-linear-gradient LegendGradient,
  @maplibre/maplibre-react-native. Native gets a deliberate small fallback.
Acceptance: load, zoom/rotate, layer toggles, popup, cleanup in Chrome + Tauri.
```

### Phase 9 — iOS widgets, EAS, assets

```text
PHASE 9: WIDGETS + NATIVE IDENTITY COMPLETION.
Allowlist: apps/expo/{app.json,eas.json,package.json,assets/**};
packages/ui/src/components/weather/widgets/**, packages/ui/src/hooks/widgets/**,
packages/ui/src/utils/mappings/weatherIconAssets.ts, packages/ui/src/assets/weathericons/**.
Legacy: apps/mobile/{app.json,eas.json,assets/images/*}, the same ui paths.

- Show old→new for every identity value before applying.
- expo-widgets + @expo/ui + expo-asset via `pnpm exec expo install`.
  Extension com.bitwebs.nativeweather.ExpoWidgetsTarget, App Group
  group.com.bitwebs.nativeweather, widgets SmallLocal, MediumLocal, SmallAQI, MediumAQI.
- EAS: projectId/owner per §2 decision; eas.json profiles as legacy.
- Fix: `##FFFFFFCC` in MediumAQI, displayName "Curret temperature", asset typo
  freezingthudner-day.png (or drop it if unreferenced). Splash + icon; dedicated
  Android adaptive foreground. Drop unused plugins (expo-font, expo-web-browser, expo-image).
- useWidgets stays iOS-only and out of web/Android paths.
Acceptance: dev build on device, widgets appear and update. No claim from web builds.
```

### Phase 10A — Server rendering and SEO

```text
PHASE 10A: PUBLIC WEB ON EXPO SERVER OUTPUT (no deploy).
Allowlist: apps/expo/app.json (web.output), apps/expo/src/app/** (+html, [city], sitemap,
robots, +not-found), apps/expo/public/**, apps/expo/package.json.
Legacy: apps/web/app/{[city]/page.tsx,metadata.ts,sitemap.ts,robots.ts,not-found.tsx,layout.tsx},
apps/web/public/**.
First fetch the current docs: docs.expo.dev/router/web/server-rendering,
/router/web/data-loaders, /versions/v58.0.0/sdk/server.

1. web.output "server". /[city] loader: slug (trim, lowercase, spaces→-) + r + cr
   from `new URL(request.url)`; query "slug, r, cr" when present; existing
   fetchWeather (simplified, returns null) → null ⇒ throw StatusError(404).
2. generateMetadata(): title "<name> (<CC>) | NativeWeather", description as legacy,
   canonical new URL(buildSlug(...), 'https://nativeweather.app'), OG + Twitter,
   /preview-image.png 1200x630. Root HTML: manifest, favicons, apple-touch icon, Umami.
3. Weather data in initial HTML (new scope): screen renders from loader data; the
   same component fetches on the client when no loader data (Tauri single).
4. 404 page noindex; robots; static sitemap (/, /compass). Cache-Control per §2.
5. SSR test: run the BUILT server output. Check MMKV hooks, Tolgee, MapLibre,
   isTauri, window/navigator stay out of the server path. Fix only what fails
   (known MMKV fix: useSyncExternalStore with a server snapshot, as Phase 1 did).
Acceptance: curl a city URL → city <title>, description, canonical, OG/Twitter before
JS; unknown city → HTTP 404; /, /search, assets, robots, sitemap work.
```

### Phase 10B — Cloudflare deploy files and Tauri `single` build

```text
PHASE 10B: DUAL OUTPUT. Deploy nothing.
Allowlist: apps/expo/{app.config.ts,package.json,wrangler.jsonc,worker entry},
apps/desktop/src-tauri/tauri.conf.json (beforeBuildCommand, frontendDist), root
package.json scripts, a small node build script, pnpm-workspace.yaml allowBuilds
(workerd, esbuild, sharp only if needed).
Legacy: apps/web/wrangler.jsonc (name nativeweather, nodejs_compat, assets binding).

- app.config.ts switches web.output to "single" when TAURI_BUILD=1, preserving all
  identifiers/plugins. Set the env from a node script (cross-platform), not
  `TAURI_BUILD=1 cmd`. Separate output dirs for server and single builds.
- Worker via expo-server/adapter/workerd; wrangler config for assets + entry.
Acceptance: `wrangler dev` serves city pages with metadata; Tauri production build
launches from the single export with no server; root scripts: build:web, build:desktop.
```

### Phase 11 — Verification and cutover proposal (read-only)

```text
PHASE 11: READ-ONLY RELEASE REVIEW. No edits.
Matrix (PASS / FAIL / NOT TESTED + proof) for iOS, Android, Chrome, Tauri macOS/Win/Linux:
weather data + errors, favourites/persistence, search, forecast, AQI, alerts, settings,
theme, locales, maps (web/Tauri), compass (web), widgets (iOS), deep links, window sizing,
permissions, SSR metadata + 404.
Greps: banned list from the contract, `STUB(`, react-native-macos, next, turbo, solito,
nativewind, patches. Optional hints: `pnpm dlx knip` (dead files/exports).
Report legacy → new file and LOC totals. Propose a cutover plan (tag old main, verify
SHA, rollback path). Execute nothing.
```

---

## Appendix A — Token map

| Legacy | New class | Status |
|---|---|---|
| `systemBackground` / `_dark` | `bg-system-background` | present |
| `secondarySystemBackground` / `_dark` | `bg-secondary-system-background` | present |
| `tertiarySystemBackground` / `_dark` | `bg-tertiary-system-background` | present |
| `label` / `_dark` (`colors.text`) | `text-label` | present |
| `secondaryLabel` / `_dark` | `text-secondary-label` | present |
| `primaryblue` | `primary-blue` | present |
| `good fair moderate sensitive unhealthy hazardous` | same | present |
| `veryunhealthy` | `very-unhealthy` | present |
| `dark:…` + `…_dark` pair | single token (switches itself) | remove `dark:` |
| `macos:…` | — | delete |
| `colors.modalBg` #F2F2F7 / #0E0E0F | `modal-background` | **add** |
| `colors.background` #F2F2F2 / #000 | fold into `system-background` / `secondary-…` | decide per use |
| `border-black/10 dark:border-white/10` (~30 uses) | `hairline` | **add** |
| Separator gray-200 / zinc-800 | `separator` | **add** |
| Skeleton `bg-white/50 dark:bg-[#0F0F11]` | `skeleton` | **add** |
| `bg-black/40`, `bg-black/30 dark:bg-black/60` | `scrim` | **add** |
| #FE9804 favourite star | `favorite` | **add** |
| #2793FF rain/chart | `chart-blue` | **add** |
| iOS accents #FF9500 #00C4CA #00C000 #FF3B30 #727E95 #80848B | `system-orange/teal/green/red/gray…` | **add** if used |
| `screens.xs` 321px | `--breakpoint-xs` | add only if Text needs it |
| `!utility` prefix (107 uses) | `utility!` or remove | prefer remove |
| wind / pressure / map-legend scales (~45 hex) | TS data constants via `style` | keep as data |

## Appendix B — Route consolidation (legacy mobile 33 screens → ~12)

| Legacy | New |
|---|---|
| `modals/{clouds,moon,range,sunrise,sunset,humidity,pressure,rain,snow,uv,wind}.tsx` + 11 `Stack.Screen` entries | `modals/[metric].tsx` + registry |
| `modals/airquality/{no2,o3,pm10,pm25,usaqi,euaqi}.tsx` | `modals/airquality/[pollutant].tsx` |
| `(settings)/{theme,language,temperature,units,aqi}.tsx` | `settings/[option].tsx` |
| `(settings)/feedback.tsx` + `modals/feedback.tsx` | one feedback route |
| `modals/forecast`, `modals/alerts/*`, `modals/airquality/index` | keep (alerts detail by id) |
| `(tabs)/(weather)/[city]` (never read `city`) | `/[city]` reads slug + r + cr |
| web `/compass` | `/compass` (web only, Phase 7) |
| `useModalNavigation({mobile, macos, web})` (22 files) | plain router navigation |

## Appendix C — Keep / merge / drop summary (legacy `packages/ui`)

| Bucket | ≈ Files | Examples |
|---|---|---|
| Drop | 59 | 16 `.macos`, `LanguageSelect.android`, `ThemeSync.web`, `useThemeColors(.web)`, `useRouter*`, `useNavigationScreen*`, `AnimatedView(.web)`, `PullIndicator`, `components/web/*` (Next error pages), `TypographyTest`, `LoadingIndicator`, `AirQualityValue`, `VersionInfo`, dead icons, 2 unreferenced PNGs |
| Merge / rewrite (78 → ~38) | 78 | 11 cards + 11 modals → `MetricCard`; 6 AQI details → `PollutantDetail`; settings buttons/selectors; Hero/Main ×3 → one responsive each; lucide wrappers |
| Restyle | 69 | primitives, lists, forecasts |
| As-is | 118 | SVG icons, landscapes, flags, pure utils, PNGs |

Dependencies to drop: `clsx`, `gsap`, `hamburger-react`, `solito`, `next`, `luxon` in ui (use `Intl`), `react-native-webview`, `expo-linear-gradient`, `@maplibre/maplibre-react-native`, `@expo/vector-icons`, `@react-navigation/native`, `expo-device-hub`, `@expo/dom-webview`. Logic to move ui → core: SmartSummary rules, search controller, chart day/domain helpers, `useSelectedDay`, `useMapLayer`, condition-code → i18n key, widget snapshot formatting.

## Appendix D — Identity values

| Key | Legacy | New |
|---|---|---|
| name / slug | `NativeWeather` / `nativeweather` | same |
| iOS bundle id | `com.rudyxsides.nativeweather` | `com.bitwebs.nativeweather` |
| Android package | `com.rudyxsides.nativeweather` | `com.bitwebs.nativeweather` |
| App Group | `group.com.rudyxsides.nativeweather` | `group.com.bitwebs.nativeweather` |
| Widget extension | `com.rudyxsides.nativeweather.ExpoWidgetsTarget` | `com.bitwebs.nativeweather.ExpoWidgetsTarget` |
| Tauri identifier | (RN macOS: `org.bitwebs.nativeweather`) | `com.bitwebs.nativeweather` |
| scheme | `mobile` | owed (default `nativeweather`) |
| EAS projectId / owner | `c5d2c429-c300-4585-8558-13717e205496` / `rudyxsides` | owed |
| Location string | "NativeWeather needs your location to show the local weather forecast." | same |
| Splash | `splash-icon.png`, width 200, bg `#007AFF` | same |

## Appendix E — Legacy artefacts to discard

`turbo.json`, root turbo/stmux/wait-on scripts, all 6 `patches/` (macOS, cosmetic chart-kit, orphan duplicate; re-check iOS on nitro 0.37 before assuming the nitro patch is moot), `apps/web/{next.config.ts,open-next.config.ts,postcss/tailwind configs,README.md}`, `apps/desktop/**` (RN macOS; keep only the window size and behaviour as reference), `apps/desktop/app/Testing.tsx`, app READMEs, `.agents/skills/nativeweather/SKILL.md` (stale: NativeWind, clsx, macOS).

## Appendix F — References (checked 2026-11-05)

- Expo server rendering: https://docs.expo.dev/router/web/server-rendering/
- Expo data loaders (stable in SDK 58): https://docs.expo.dev/router/web/data-loaders/
- Expo Router SDK 57 → 58 migration (default `web.output` is `server`): https://docs.expo.dev/router/migrate/sdk-57-to-58/
- expo-server (workerd adapter): https://docs.expo.dev/versions/latest/sdk/server/
- Publishing websites / output modes: https://docs.expo.dev/guides/publishing-websites/
- react-native-mmkv: https://github.com/mrousavy/react-native-mmkv
- Tauri `isTauri()`: https://v2.tauri.app/reference/javascript/api/namespacecore/#istauri
- Uniwind (`useCSSVariable`, `withUniwind`): https://github.com/uni-stack/uniwind
