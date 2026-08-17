'use client';

import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { HeroSkeleton } from 'app/components/common/ui/HeroSkeleton';
import { HeroWeather } from 'app/components/weather/hero/HeroWeather';
// import { useSearchController } from 'app/hooks/search/useSearchController';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useStorageString } from 'app/storage/useStorage';
import { countryCode } from 'app/utils/helpers/countryCode';
import { buildSlug } from 'app/utils/services/buildSlug';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const WeatherFeature = () => {
	const { t } = useTranslate('common');
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	// const { weatherLoading } = useSearchController();
	const router = useRouter();
	const params = useParams<{ city: string }>();
	const searchParams = useSearchParams();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const loadWeather = async () => {
			const slug = params.city;
			if (!slug) return;

			setLoading(true);
			setError(false);

			const r = searchParams.get('r');
			const cr = searchParams.get('cr');

			const city = slug.trim().toLowerCase().replace(/\s+/g, '-');
			const query = cr || r ? `${city}, ${r}, ${cr}` : city;

			try {
				const data = await fetchWeather(query, currentSource);

				if (data) {
					const path = buildSlug(data);
					if (path !== window.location.pathname) {
						router.replace(path);
					}
					setWeatherData(data);
				} else {
					setError(true);
				}
			} catch {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		loadWeather();
	}, [params.city, currentSource]);

	useEffect(
		useCallback(() => {
			document.title = 'NativeWeather';
			if (weatherData?.location) {
				const code = countryCode(weatherData.location.country)?.toUpperCase();
				document.title = `NativeWeather | ${weatherData.location.name} (${code})`;
			}
		}, [weatherData?.location])
	);

	if (!weatherData) return null;

	// if (error) {
	// 	return (
	// 		<View className={clsx('w-full items-center')}>
	// 			<RoundView className={clsx('p-4 max-md:w-full')}>
	// 				<StyledText type="body" className={clsx('text-center font-semibold !text-red-500')}>
	// 					{t('search.url.error')}
	// 				</StyledText>
	// 			</RoundView>
	// 		</View>
	// 	);
	// }

	if (loading && !weatherData) {
		return <HeroSkeleton />;
	}

	return (
		<AnimatedView duration={20}>
			<HeroWeather />
		</AnimatedView>
	);
};
