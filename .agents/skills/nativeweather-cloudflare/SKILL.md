---
name: nativeweather-cloudflare
description: NativeWeather-specific Cloudflare/OpenNext guidance. Use when changing apps/web deployment, wrangler.jsonc, OpenNext Cloudflare build/preview/deploy, Workers runtime behavior, headers, caching, metadata, public routes, or production issues on nativeweather.app. Keep the generic Cloudflare docs in mind, but apply this repo's exact scripts and config first.
---

# NativeWeather Cloudflare

Use this for web deployment and production behavior in `apps/web`.

## Project Facts

- Web app: `apps/web`
- Framework: Next.js 16, React 19, React Native Web
- Deploy target: Cloudflare Workers via `@opennextjs/cloudflare`
- Config: `apps/web/wrangler.jsonc`
- Worker entry: `.open-next/worker.js`
- Assets binding: `ASSETS`, directory `.open-next/assets`
- Compatibility flag: `nodejs_compat`
- Production domain: `https://nativeweather.app`

## Commands

Run from `apps/web` unless noted:

```bash
pnpm run typecheck
pnpm run build
pnpm run preview
pnpm run deploy
```

Root checks can be noisy because mobile typecheck has workspace module-resolution issues. Prefer targeted web checks for web-only work.

## Rules

- Do not hand-edit `.open-next/`; it is generated.
- Keep secrets out of `wrangler.jsonc` and source.
- Use `wrangler.jsonc`, not TOML, for Cloudflare config changes.
- After changing Cloudflare config, validate with `pnpm run preview` or an OpenNext build before deploy.
- If touching production routing, verify `robots.txt`, `sitemap.xml`, metadata, and unknown routes explicitly.
- Use `agent-browser` for production smoke tests: console, errors, network requests, and vitals.
- If Wrangler command syntax is uncertain, check current Wrangler/OpenNext docs before editing.

## Known Production Checks

- Home should render without console/page errors.
- Settings theme switching should not trigger React state-update warnings.
- Weather city routes should load forecast API, Open-Meteo AQI, OpenFreeMap tiles, and WeatherAPI map tiles.
- Discovery routes should not be accidentally handled as weather city slugs.
