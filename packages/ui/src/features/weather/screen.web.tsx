'use client';

import type { NormalizedData } from '@nativeweather/types/normalizedData';
import { HeroSkeleton } from '@nativeweather/ui/components/common/loading/HeroSkeleton.web';
import { HeroWeather } from '@nativeweather/ui/components/weather/hero/HeroWeather';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { buildSlug } from '@nativeweather/core/utils/weatherSlug';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const WeatherFeature = ({ initialWeather }: { initialWeather: NormalizedData }) => {
	const { weatherData, setWeatherData } = useWeather();
	const router = useRouter();

	useEffect(() => {
		const path = buildSlug(initialWeather);
		const currentWeather = useWeather.getState().weatherData;
		if (!currentWeather || buildSlug(currentWeather) !== path) void setWeatherData(initialWeather);
		if (path !== `${window.location.pathname}${window.location.search}`) router.replace(path);
	}, [initialWeather, router, setWeatherData]);

	if (
		!weatherData ||
		weatherData.location.lat !== initialWeather.location.lat ||
		weatherData.location.lon !== initialWeather.location.lon
	)
		return <HeroSkeleton />;

	return <HeroWeather />;
};
