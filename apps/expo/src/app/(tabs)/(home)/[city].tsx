// STUB(phase-6): slice 6.7 replaces this with the full weather screen; Phase 10A adds the server loader.
import { fetchWeather } from '@nativeweather/api';
import { useWeather } from '@nativeweather/core';
import {
	AirQualityCard,
	AlertsCard,
	DailyForecast,
	HourlyForecast,
	MainWeather,
	MetricCards,
	ScreenWrapper,
	Skeleton,
	SmartSummary,
	Text,
} from '@nativeweather/ui';
import { router, Stack, Unmatched, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

// Future static routes that `[city]` would otherwise swallow.
const reservedSlugs = ['compass', 'modals', 'api'];

const CityWeather = ({ query }: { query: string }) => {
	const weatherData = useWeather((state) => state.weatherData);
	const setWeatherData = useWeather((state) => state.setWeatherData);
	const [failedQuery, setFailedQuery] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		void fetchWeather(query, { signal: controller.signal }).then((data) => {
			if (controller.signal.aborted) return;
			if (data) void setWeatherData(data);
			else setFailedQuery(query);
		});
		return () => controller.abort();
	}, [query, setWeatherData]);

	return (
		<View className="flex-1 bg-screen-background">
			<Stack.Screen options={{ title: weatherData?.location.name ?? '' }} />
			<ScreenWrapper>
				<View className="gap-4 pb-8">
					{failedQuery === query ? (
						<Text type="body">Couldn't load weather for “{query}”.</Text>
					) : weatherData ? (
						<>
							<MainWeather weather={weatherData} />
							<AlertsCard onPress={() => router.push('/modals/alerts')} />
							<SmartSummary />
							<HourlyForecast />
							<DailyForecast
								onSelectDay={(day) => router.push({ pathname: '/modals/forecast', params: { day: String(day) } })}
							/>
							<AirQualityCard onPress={() => router.push('/modals/airquality')} />
							<MetricCards
								onOpen={(metric, day) =>
									router.push({
										pathname: '/modals/[metric]',
										params: day === undefined ? { metric } : { metric, day: String(day) },
									})
								}
							/>
						</>
					) : (
						<>
							<Skeleton className="h-72" />
							<Skeleton className="h-32" />
							<Skeleton className="h-48" />
						</>
					)}
				</View>
			</ScreenWrapper>
		</View>
	);
};

export default function CityScreen() {
	const { city, r, cr } = useLocalSearchParams<{ city: string; r?: string; cr?: string }>();

	if (reservedSlugs.includes(city)) return <Unmatched />;

	return <CityWeather query={[city, r, cr].filter(Boolean).join(', ')} />;
}
