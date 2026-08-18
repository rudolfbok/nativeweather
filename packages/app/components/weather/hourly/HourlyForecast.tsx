import { useTolgee, useTranslate } from '@tolgee/react';
import { useWeather } from 'app/hooks/weather/useWeather';
import { HourlyCarousel } from './HourlyCarousel';
import { HourlyItem } from './HourlyItem';

export const HourlyForecast = () => {
	const { t } = useTranslate('weather');
	const weatherData = useWeather((state) => state.weatherData);

	const tolgee = useTolgee();
	const tolgeeLang = tolgee.getLanguage();

	const getHour24FromEpoch = (epochTime: number, timezone: string) => {
		const date = new Date(epochTime * 1000);
		return parseInt(
			new Intl.DateTimeFormat('en-US', {
				hour: '2-digit',
				hour12: false,
				timeZone: timezone,
			}).format(date),
			10
		);
	};

	const getDisplayHourFromEpoch = (epochTime: number, timezone: string) => {
		const date = new Date(epochTime * 1000);

		if (tolgeeLang === 'en-US') {
			return new Intl.DateTimeFormat('en-US', {
				hour: 'numeric',
				hour12: true,
				timeZone: timezone,
			}).format(date);
		} else {
			const hour24 = parseInt(
				new Intl.DateTimeFormat('cs-CZ', {
					hour: '2-digit',
					hour12: false,
					timeZone: timezone,
				}).format(date),
				10
			);
			return hour24.toString();
		}
	};

	const tzId = weatherData?.location?.tzId ?? 'UTC';

	const now = new Date();
	const currentHour24 = parseInt(
		new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			hour12: false,
			timeZone: tzId,
		}).format(now),
		10
	);

	const currentIndex = weatherData!.forecast.forecastday[0]!.hour.findIndex(
		(hour) => getHour24FromEpoch(hour.timeEpoch, tzId) === currentHour24
	);

	if (currentIndex === -1) {
		return null;
	}

	const todayHours = weatherData?.forecast?.forecastday[0]?.hour.slice(currentIndex, 24) || [];
	const nextDayHours = weatherData?.forecast?.forecastday[1]?.hour.slice(0, 24 - todayHours.length) || [];
	const combinedHours = [...todayHours, ...nextDayHours];

	const hourlyData = combinedHours.map((hour, index) => ({
		tempC: hour.tempC,
		tempF: hour.tempF,
		chanceOfRain: hour.chanceOfRain,
		code: hour.condition.code,
		isDay: hour.isDay,
		timeEpoch: hour.timeEpoch,
		hourLabel: index === 0 ? t('hourlyforecast.now') : getDisplayHourFromEpoch(hour.timeEpoch, tzId),
	}));

	return (
		<HourlyCarousel
			data={hourlyData}
			renderItem={(hour, index) => (
				<HourlyItem
					key={index}
					hour={hour.hourLabel}
					rainChance={hour.chanceOfRain}
					isDay={hour.isDay}
					code={hour.code}
					tempC={hour.tempC}
					tempF={hour.tempF}
				/>
			)}
		/>
	);
};
