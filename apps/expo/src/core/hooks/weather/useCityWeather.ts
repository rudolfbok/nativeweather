import { fetchWeatherResult } from '@nativeweather/api';
import type { WeatherResult } from '@nativeweather/api';
import { useCallback, useEffect, useState } from 'react';

/**
 * Loads the weather for a location query. The result belongs to this screen only: `weather` and `error` stay null
 * until this query (or its retry) has loaded. Putting it into the shared store (read by the cards and modals) is up to
 * the screen, which does so while it is shown.
 */
export const useCityWeather = (query: string) => {
	const [attempt, setAttempt] = useState(0);
	const [result, setResult] = useState<(WeatherResult & { query: string; attempt: number }) | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		void fetchWeatherResult(query, { signal: controller.signal }).then((loaded) => {
			if (!controller.signal.aborted) setResult({ ...loaded, query, attempt });
		});
		return () => controller.abort();
	}, [query, attempt]);

	/** Resolves to whether fresh data arrived. */
	const refresh = useCallback(async () => {
		const loaded = await fetchWeatherResult(query);
		if (loaded.weather) setResult({ ...loaded, query, attempt });
		return Boolean(loaded.weather);
	}, [query, attempt]);

	/** Loads again after an error, showing the loading state meanwhile. */
	const retry = useCallback(() => setAttempt((value) => value + 1), []);

	const settled = result?.query === query && result.attempt === attempt ? result : null;

	return { weather: settled?.weather ?? null, error: settled?.error ?? null, refresh, retry };
};
