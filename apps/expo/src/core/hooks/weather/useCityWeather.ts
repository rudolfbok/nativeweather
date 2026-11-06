import { fetchWeather } from '@nativeweather/api';
import { useCallback, useEffect, useState } from 'react';
import { useWeather } from './weatherStore';

/**
 * Loads the weather for a location query into the store. `weather` stays null until it has loaded for this query,
 * so a city that was open before is never shown under the new one.
 */
export const useCityWeather = (query: string) => {
	const weather = useWeather((state) => state.weatherData);
	const setWeatherData = useWeather((state) => state.setWeatherData);
	const [result, setResult] = useState<{ query: string; found: boolean } | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		void fetchWeather(query, { signal: controller.signal }).then((data) => {
			if (controller.signal.aborted) return;
			if (data) void setWeatherData(data);
			setResult({ query, found: Boolean(data) });
		});
		return () => controller.abort();
	}, [query, setWeatherData]);

	/** Resolves to whether fresh data arrived. */
	const refresh = useCallback(async () => {
		const data = await fetchWeather(query);
		if (data) void setWeatherData(data);
		return Boolean(data);
	}, [query, setWeatherData]);

	const settled = result?.query === query ? result : null;

	return { weather: settled?.found ? weather : null, failed: settled?.found === false, refresh };
};
