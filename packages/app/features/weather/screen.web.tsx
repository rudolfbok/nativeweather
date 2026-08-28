'use client';

import { fetchWeather } from 'app/api/fetchWeather';
import { HeroSkeleton } from 'app/components/weather/hero/HeroSkeleton';
import { HeroWeather } from 'app/components/weather/hero/HeroWeather';
import { useStorageString } from 'app/database/useStorage';
import { useWeather } from 'app/hooks/weather/useWeather';
import { countryCode } from 'app/utils/countryCode';
import { buildSlug } from 'app/utils/weatherSlug';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const WeatherFeature = () => {
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const router = useRouter();
	const params = useParams<{ city: string }>();
	const searchParams = useSearchParams();
	const region = searchParams.get('r');
	const country = searchParams.get('cr');

	useEffect(() => {
		const controller = new AbortController();

		const loadWeather = async () => {
			const city = params.city?.trim().toLowerCase().replace(/\s+/g, '-');
			if (!city) return;

			const currentPath = `${window.location.pathname}${window.location.search}`;
			const currentWeather = useWeather.getState().weatherData;
			if (currentWeather && buildSlug(currentWeather) === currentPath) return;

			const query = country || region ? `${city}, ${region ?? ''}, ${country ?? ''}` : city;
			const data = await fetchWeather(query, currentSource, { signal: controller.signal });

			if (!controller.signal.aborted && data) {
				const path = buildSlug(data);
				if (path !== currentPath) router.replace(path);
				setWeatherData(data);
			}

		};

		loadWeather();
		return () => controller.abort();
	}, [country, currentSource, params.city, region, router, setWeatherData]);

	useEffect(() => {
		document.title = 'NativeWeather';
		if (!weatherData) return;

		const code = countryCode(weatherData.location.country)?.toUpperCase();
		document.title = `NativeWeather | ${weatherData.location.name} (${code})`;
	}, [weatherData]);

	if (!weatherData) return <HeroSkeleton />;

	return <HeroWeather />;
};
