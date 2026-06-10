# NativeWeather API

Cloudflare Worker API for NativeWeather. It keeps the WeatherAPI.com key on the server and can also proxy Open-Meteo air quality data.

## Setup

```sh
pnpm install
```

For local development, edit `.env.local` and set:

```sh
WEATHER_API_KEY=your-weatherapi-key
```

Start the Worker locally:

```sh
pnpm run dev
```

## Endpoints

- `GET /forecast.json?q=Amsterdam` proxies WeatherAPI forecast data.
- `GET /search.json?q=Amsterdam` proxies WeatherAPI search suggestions.
- `GET /air-quality?lat=52.37&lon=4.89` proxies Open-Meteo air quality data.
- `GET /weather?q=Amsterdam` returns `{ weatherData, airQualityData }` in one response.

## Deploy

Set the production secret before deploying:

```sh
pnpm exec wrangler secret put WEATHER_API_KEY
```

Deploy:

```sh
pnpm run deploy
```

After deploy, update the app API base URL to the deployed Worker URL.
