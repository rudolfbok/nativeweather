import { formatHourLabel, getNext24Hours, useWeather } from '@/core';
import { useTolgee, useTranslate } from '@tolgee/react';
import { useState } from 'react';
import { HourlyCarousel } from './HourlyCarousel';
import { HourlyItem } from './HourlyItem';

export const HourlyForecast = () => {
	const { t } = useTranslate('weather');
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const weatherData = useWeather((state) => state.weatherData);
	// Fixed at mount so the window doesn't shift while the screen is open.
	const [now] = useState(Date.now);

	if (!weatherData) return null;

	const hours = getNext24Hours(weatherData, now);
	if (hours.length === 0) return null;

	return (
		<HourlyCarousel
			data={hours}
			renderItem={(hour, index) => (
				<HourlyItem
					key={hour.timeEpoch}
					hour={hour}
					label={
						index === 0 ? t('hourlyforecast.now') : formatHourLabel(hour.timeEpoch, weatherData.location.tzId, language)
					}
				/>
			)}
		/>
	);
};
