import { formatDayTitle, useWeather } from '@nativeweather/core';
import { DayForecast, DaysToggle } from '@nativeweather/ui';
import { useTolgee } from '@tolgee/react';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { AppModalScreen } from '@/components/AppModalScreen';

const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

export default function ForecastModal() {
	const { day } = useLocalSearchParams<{ day?: string }>();
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const days = useWeather((state) => state.weatherData?.forecast.forecastday);

	// Weather only lives in memory for now, so a reload of this URL has nothing to show.
	if (!days?.length) return <Redirect href="/" />;

	const dayIndex = Math.min(Math.max(0, Number(day) || 0), days.length - 1);
	const { date } = days[dayIndex];

	return (
		<AppModalScreen
			header={formatDayTitle(date, language)}
			onClose={close}
			toolbar={<DaysToggle selectedIndex={dayIndex} onSelect={(index) => router.setParams({ day: String(index) })} />}
		>
			<DayForecast
				dayIndex={dayIndex}
				onOpenMetric={(metric, metricDay) =>
					router.push({
						pathname: '/modals/[metric]',
						params: metricDay === undefined ? { metric } : { metric, day: String(metricDay) },
					})
				}
			/>
		</AppModalScreen>
	);
}
