# nativeweather web

React + TypeScript + Vite landing page for nativeweather.

## Local development

```bash
bun install
bun run dev
```

## Cloudflare Pages deployment

This project deploys as a static Vite site to the Cloudflare Pages project
`nativeweather`, which produces the URL:

<https://nativeweather.pages.dev>

Authenticate Wrangler once on your machine:

```bash
bunx wrangler login
```

Create the Pages project once if it does not already exist:

```bash
bunx wrangler pages project create nativeweather
```

Deploy the production build:

```bash
bun run deploy
```

Deploy a preview under the `preview` branch:

```bash
bun run deploy:preview
```

The project name must be available in the Cloudflare account. Do not commit
Cloudflare API tokens or other credentials; Wrangler stores authentication
outside the repository.
