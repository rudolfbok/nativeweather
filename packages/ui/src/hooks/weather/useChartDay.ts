import type { NormalizedData } from '@nativeweather/types/normalizedData';
import { useState } from 'react';

export const getWeatherDate = (epoch: number, timeZone: string) => {
	const parts = new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone,
	}).formatToParts(new Date(epoch * 1000));
	return `${parts.find((part) => part.type === 'year')?.value}-${parts.find((part) => part.type === 'month')?.value}-${parts.find((part) => part.type === 'day')?.value}`;
};

export const useChartDay = (weather: NormalizedData | null, initialDate?: string) => {
	const location = weather ? `${weather.location.lat},${weather.location.lon}` : '';
	const today = getWeatherDate(weather?.location.localtimeEpoch ?? 0, weather?.location.tzId ?? 'UTC');
	const [selection, setSelection] = useState({ location, date: initialDate ?? today });
	if (weather && selection.location !== location) {
		setSelection({ location, date: selection.location ? today : (initialDate ?? today) });
	}
	const days = weather?.forecast.forecastday.slice(0, 7) ?? [];
	const requested = selection.location === location ? selection.date : today;
	const date =
		days.find((day) => day.date === requested && day.hour.length)?.date ??
		days.find((day) => day.date === today && day.hour.length)?.date ??
		days.find((day) => day.hour.length)?.date ??
		today;
	return {
		date,
		isToday: date === today,
		selectDay: (day: NormalizedData['forecast']['forecastday'][number]) => setSelection({ location, date: day.date }),
	};
};
