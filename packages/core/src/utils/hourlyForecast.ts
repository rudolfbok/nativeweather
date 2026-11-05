import type { NormalizedData } from '@nativeweather/types';

export type ForecastHour = NormalizedData['forecast']['forecastday'][number]['hour'][number];

/** The 24 forecast hours starting with the current one, spanning today and tomorrow. */
export const getNext24Hours = (weather: NormalizedData, now = Date.now()): ForecastHour[] => {
	const currentHourStart = now / 1000 - 3600;
	return weather.forecast.forecastday
		.flatMap((day) => day.hour)
		.filter((hour) => hour.timeEpoch > currentHourStart)
		.slice(0, 24);
};

/** "3 PM" in en-US, the 24-hour number ("15") in every other language, in the location's time zone. */
export const formatHourLabel = (epochSeconds: number, timeZone: string, language: string) => {
	const date = new Date(epochSeconds * 1000);
	if (language === 'en-US') return new Intl.DateTimeFormat('en-US', { hour: 'numeric', timeZone }).format(date);
	return String(Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone }).format(date)));
};
