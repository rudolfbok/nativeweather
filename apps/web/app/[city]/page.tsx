'use client';

import { HeroWeather } from 'app/components/weather/HeroWeather';
import { useWeather } from 'app/hooks/useWeather';
import { countryNameToCode } from 'app/utils/helpers/contryNameToCode';
import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { fetchWeather } from 'app/api/fetchWeather';
import { buildWeatherSlug } from 'app/utils/helpers/buildWeatherSlug';
import { StyledText } from 'app/components/common/StyledText';

export default function WeatherPage() {
	const { weatherData, setWeatherData } = useWeather();
	const router = useRouter();
	const params = useParams<{ city: string }>();
	const searchParams = useSearchParams();

	useEffect(() => {
		const loadWeather = async () => {
			const slug = params.city;
			const r = searchParams.get('r');
			const cr = searchParams.get('cr');

			if (!slug) return;

			try {
				const city = slug.trim().toLowerCase().replace(/\s+/g, '-');
				const query = cr || r ? `${city}, ${r}, ${cr}` : city;

				const { weatherData } = await fetchWeather(query);
				router.replace(buildWeatherSlug(weatherData));
				setWeatherData(weatherData);
			} catch (error) {
				console.error('Failed to fetch weather:', error);
			}
		};

		loadWeather();
	}, [params.city, searchParams]);

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

	if (!weatherData) {
		// router.replace('not-found');
		return (
			<StyledText type="title">Couldnt find the city you are looking for. Please repeat and be more smart</StyledText>
		);
	}

	return <HeroWeather />;
}
