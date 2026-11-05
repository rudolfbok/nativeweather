import { formatHourLabel, useWeather } from '@nativeweather/core';
import { useTolgee } from '@tolgee/react';
import { View } from 'react-native';
import { HourlyCarousel } from '../hourly/HourlyCarousel';
import { HourlyItem } from '../hourly/HourlyItem';
import { MainWeather } from '../MainWeather';
import { SmartSummary } from '../SmartSummary';

/** One forecast day in full: main card, summary and its 24 hours. */
export const DayForecast = ({ dayIndex }: { dayIndex: number }) => {
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
			{/* STUB(phase-6): slice 6.4 adds the rain/snow, UV, visibility and wind cards for this day. */}
		</View>
	);
};
