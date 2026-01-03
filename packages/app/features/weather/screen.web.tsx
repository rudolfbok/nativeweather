'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { HeroWeather } from 'app/components/weather/HeroWeather';
import { useWeather } from 'app/hooks/useWeather';
import { countryNameToCode } from 'app/utils/helpers/contryNameToCode';
import { fetchWeather } from 'app/api/fetchWeather';
import { buildWeatherSlug } from 'app/utils/helpers/buildWeatherSlug';
import { StyledText } from 'app/components/common/StyledText';
import { AnimatedView } from 'app/components/common/AnimatedView'; // cross-platform GSAP/Reanimated
import { LoadingIndicator } from 'app/components/common/LoadingIndicator';
import { View } from 'react-native';
import clsx from 'clsx';

export const WeatherFeature = () => {
	const { weatherData, setWeatherData } = useWeather();
	const router = useRouter();
	const params = useParams<{ city: string }>();
	const searchParams = useSearchParams();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const loadWeather = async () => {
			const slug = params.city;
			if (!slug) return;

			// setLoading(true);
			setError(false);

			const r = searchParams.get('r');
			const cr = searchParams.get('cr');

			const city = slug.trim().toLowerCase().replace(/\s+/g, '-');
			const query = cr || r ? `${city}, ${r}, ${cr}` : city;

			try {
				const data = await fetchWeather(query);

				if (data) {
					const path = buildWeatherSlug(data);
					if (path !== window.location.pathname) {
						router.replace(path);
					}
					setWeatherData(data);
				} else {
					setError(true);
				}
			} catch {
				setError(true);
			}
			// } finally {
			// 	setLoading(false);
			// }
		};

		loadWeather();
	}, [params.city]);

	useEffect(() => {
		document.title = 'NativeWeather';
		if (weatherData?.location) {
			const countryCode = countryNameToCode(weatherData.location.country)?.toUpperCase();
			document.title = `NativeWeather | ${weatherData.location.name} (${countryCode})`;
		}
		return () => {
			document.title = 'NativeWeather';
		};
	}, [weatherData?.location]);

	// if (loading) {
	// 	return <LoadingIndicator text="Loading weather..." />;
	// }

	if (!weatherData) return null;

	if (error) {
		return (
			<View className={clsx('w-full items-center')}>
				<StyledText type="title" className={clsx('text-center')}>
					Could not find the city you are looking for. <br /> Please repeat and be more smart
				</StyledText>
			</View>
		);
	}

	return (
		<AnimatedView transition={{ duration: 300 }}>
			<HeroWeather />
		</AnimatedView>
	);
};
