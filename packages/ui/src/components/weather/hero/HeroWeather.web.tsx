'use client';

import { AirQuality } from '@nativeweather/ui/components/airquality/AirQuality';
import {
	CloudsCard,
	HumidityCard,
	MoonCard,
	PressureCard,
	RainCard,
	RangeCard,
	SnowCard,
	SunriseCard,
	SunsetCard,
	UVCard,
	WindCard,
} from '@nativeweather/ui/components/cards';
import { DailyForecast } from '@nativeweather/ui/components/weather/daily/DailyForecast';
import { MainWeather } from '@nativeweather/ui/components/weather/main/MainWeather';
import { useMapConditions } from '@nativeweather/ui/hooks/conditions/useMapConditions';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { getAlerts } from '@nativeweather/core/utils/alertFilters';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { AlertWeather } from '../../alerts/AlertWeather';
import { MapsView } from '../../maps/views/MapsView';
import { HourlyForecast } from '../hourly/HourlyForecast';
import { SmartSummary } from '../SmartSummary';
import { getHour24FromEpoch } from '../hourly/getHour24FromEpoch';
import { useState } from 'react';

export const HeroWeather = () => {
	const { weatherData } = useWeather();
	const mapConditions = useMapConditions();
	const [now] = useState(() => new Date());

	if (!weatherData) return null;

	const tzId = weatherData.location.tzId || 'UTC';

	const currentHour24 = parseInt(
		new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			hour12: false,
			timeZone: tzId,
		}).format(now),
		10
	);

	const currentHour =
		weatherData.forecast.forecastday[0].hour.find(
			(hour) => getHour24FromEpoch(hour.timeEpoch, tzId) === currentHour24
		) ?? weatherData.forecast.forecastday[0].hour[0];

	const currentRainChance = currentHour?.chanceOfRain ?? 0;
	const currentSnowChance = currentHour?.chanceOfSnow ?? 0;
	const currentSnowPrecipCm = currentHour?.snowCm ?? 0;
	const currentSnowPrecipIn = (currentSnowPrecipCm * 0.393701).toFixed(2);
	const filteredAlerts = getAlerts(weatherData.alerts.alert, weatherData.location);
	const alertsLength = filteredAlerts.length ?? 0;
	const conditionLabel = mapConditions(weatherData.current.condition.code, weatherData.current.isDay);

	const renderDataCardGrid = () => {
		return (
			<>
				{currentSnowChance > currentRainChance ? (
					<SnowCard
						snowChance={currentSnowChance}
						snowPrecipCm={currentSnowPrecipCm}
						snowPrecipIn={Number(currentSnowPrecipIn)}
					/>
				) : (
					<RainCard
						rainChance={currentRainChance}
						rainPrecipMm={weatherData.current.precipMm}
						rainPrecipIn={weatherData.current.precipIn}
					/>
				)}
				<WindCard
					windKm={Math.round(weatherData.current.windKph)}
					windMil={Math.round(weatherData.current.windMph)}
					gustKm={Math.round(weatherData.current.gustKph)}
					gustMil={Math.round(weatherData.current.gustMph)}
					degree={weatherData.current.windDegree}
					details={true}
					currentWind={true}
				/>
				<UVCard data={weatherData.current.uv} />
				<RangeCard visKm={weatherData.current.rangeKm} visMiles={weatherData.current.rangeMiles} />
				<HumidityCard
					data={weatherData.current.humidity}
					dewPoint={true}
					dewPointC={weatherData.current.dewPointC}
					dewPointF={weatherData.current.dewPointF}
				/>
				<PressureCard pressureMb={weatherData.current.pressureMb} pressureIn={weatherData.current.pressureInHg} />
				<SunriseCard
					data={weatherData.forecast.forecastday[0]?.astro.sunrise}
					tomorrowData={weatherData.forecast.forecastday[1]?.astro.sunrise}
					timeZone={weatherData.location.tzId || 'UTC'}
				/>
				<SunsetCard
					data={weatherData.forecast.forecastday[0]?.astro.sunset}
					tomorrowData={weatherData.forecast.forecastday[1]?.astro.sunset}
					timeZone={weatherData.location.tzId || 'UTC'}
				/>
				<CloudsCard data={weatherData.current.cloudCover} />
				<MoonCard
					phase={weatherData.forecast.forecastday[0].astro.moonPhase}
					illumination={weatherData.forecast.forecastday[0].astro.moonIllumination}
					isMoonUp={weatherData.forecast.forecastday[0].astro.isMoonUp}
					moonrise={weatherData.forecast.forecastday[0].astro.moonRise ?? ''}
					moonset={weatherData.forecast.forecastday[0].astro.moonSet ?? ''}
				/>
			</>
		);
	};

	return (
		<View className={clsx('pb-4')}>
			<View className={clsx('grid select-none grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}>
				<View className={clsx('flex-col gap-4')}>
					<View className="gap-4">
						<MainWeather
							name={weatherData.location.name}
							country={weatherData.location.country}
							currentTempC={weatherData.current.tempC}
							currentTempF={weatherData.current.tempF}
							feelsLikeC={weatherData.current.feelsLikeC}
							feelsLikeF={weatherData.current.feelsLikeF}
							maxTempC={weatherData.forecast.forecastday[0]?.day.maxTempC}
							maxTempF={weatherData.forecast.forecastday[0]?.day.maxTempF}
							minTempC={weatherData.forecast.forecastday[0]?.day.minTempC}
							minTempF={weatherData.forecast.forecastday[0]?.day.minTempF}
							isDay={weatherData.current.isDay}
							code={weatherData.current.condition.code}
							feelslike={true}
							condition={conditionLabel}
							// colorScheme={weatherData.current.isDay === 1 ? 'light' : 'dark'}
						/>
						<AlertWeather filteredAlerts={filteredAlerts} alertsLength={alertsLength} />
					</View>
					<SmartSummary
						minTempC={weatherData.forecast.forecastday[0].day.minTempC}
						maxTempC={weatherData.forecast.forecastday[0].day.maxTempC}
						minTempF={weatherData.forecast.forecastday[0].day.minTempF}
						maxTempF={weatherData.forecast.forecastday[0].day.maxTempF}
						rainPrecipMm={weatherData.forecast.forecastday[0].day.totalPrecipMm}
						rainPrecipIn={weatherData.forecast.forecastday[0].day.totalPrecipIn}
						snowPrecipCm={weatherData.forecast.forecastday[0].day.totalSnowCm}
						snowPrecipIn={Number((weatherData.forecast.forecastday[0].day.totalSnowCm * 0.393701).toFixed(2))}
						uv={weatherData.forecast.forecastday[0].day.uv}
						maxWindKph={weatherData.forecast.forecastday[0].day.maxWindKph}
						avgRangeKm={weatherData.forecast.forecastday[0].day.avgVisKm}
						avgRangeMiles={weatherData.forecast.forecastday[0].day.avgVisMiles}
						dateEpoch={weatherData.forecast.forecastday[0].date_epoch}
						conditionCodes={weatherData.forecast.forecastday[0].hour.map((hour) => hour.condition.code)}
					/>
					<HourlyForecast />
					<AirQuality className={clsx('xl:hidden')} />
				</View>
				<View className={clsx('gap-4')}>
					<DailyForecast />
					<MapsView />
				</View>
				<View
					className={clsx(
						'native:px-4 flex flex-row flex-wrap items-center justify-between gap-4',
						'web:grid web:h-fit web:grid-cols-2 web:md:hidden web:xl:grid web:xl:grid-cols-3'
					)}
				>
					<AirQuality className={clsx('max-xl:hidden')} />
					{renderDataCardGrid()}
				</View>
			</View>
			<View className={clsx('mt-4 hidden h-fit grid-cols-4 gap-4 md:grid xl:hidden')}>{renderDataCardGrid()}</View>
		</View>
	);
};
