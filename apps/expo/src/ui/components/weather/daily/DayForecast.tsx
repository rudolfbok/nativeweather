import { formatHourLabel, useWeather } from '@/core';
import { useTolgee } from '@tolgee/react';
import { View } from 'react-native';
import { MetricCards } from '../../metrics/MetricCards';
import type { MetricId } from '../../metrics/registry';
import { HourlyCarousel } from '../hourly/HourlyCarousel';
import { HourlyItem } from '../hourly/HourlyItem';
import { MainWeather } from '../MainWeather';
import { SmartSummary } from '../SmartSummary';

interface DayForecastProps {
	dayIndex: number;
	onOpenMetric: (metric: MetricId, day?: number) => void;
}

/** One forecast day in full: main card, summary, its 24 hours and its metric cards. */
export const DayForecast = ({ dayIndex, onOpenMetric }: DayForecastProps) => {
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const weatherData = useWeather((state) => state.weatherData);
	const day = weatherData?.forecast.forecastday[dayIndex];

	if (!weatherData || !day) return null;

	return (
		<View className="w-full gap-4">
			<MainWeather weather={weatherData} dayIndex={dayIndex} />
			<SmartSummary dayIndex={dayIndex} />
			{day.hour.length > 0 && (
				<HourlyCarousel
					data={day.hour}
					renderItem={(hour) => (
						<HourlyItem
							key={hour.timeEpoch}
							hour={hour}
							label={formatHourLabel(hour.timeEpoch, weatherData.location.tzId, language)}
						/>
					)}
				/>
			)}
			<MetricCards dayIndex={dayIndex} onOpen={onOpenMetric} />
		</View>
	);
};
