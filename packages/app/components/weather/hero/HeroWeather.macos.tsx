'use client';

import {
	HumidityCard,
	MoonCard,
	PressureCard,
	RainCard,
	SnowCard,
	SunriseCard,
	SunsetCard,
	UVCard,
	RangeCard,
	WindCard,
	CloudsCard,
} from 'app/components/cards';
import { AirQuality } from 'app/components/weather/airquality/AirQuality';
import { AlertWeather } from '../alerts/AlertWeather';
import { DailyForecast } from 'app/components/weather/daily/DailyForecast';
import { MainWeather } from 'app/components/weather/main/MainWeather';
import { useMapConditions } from 'app/hooks/conditions/useMapConditions';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useStorageString } from 'app/storage/useStorage';
import { getAlerts } from 'app/utils/helpers/getAlerts';
import { View } from 'react-native';
import { HourlyForecast } from '../hourly/HourlyForecast';
import { SmartSummary } from '../SmartSummary';

export const HeroWeather = () => {
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, airQualityData } = useWeather();
	const mapConditions = useMapConditions();

	if (!weatherData) return null;

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

	const tzId = weatherData.location.tzId || 'UTC';

	const now = new Date();
	const currentHour24 = parseInt(
		new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			hour12: false,
			timeZone: tzId,
		}).format(now),
		10
	);

	const currentHour = weatherData.forecast.forecastday[0].hour.find(
		(hour) => getHour24FromEpoch(hour.timeEpoch, tzId) === currentHour24
	);
	const currentRainChance = currentHour?.chanceOfRain ?? 0;
	const currentSnowChance = currentHour?.chanceOfSnow ?? 0;
	const currentSnowPrecipCm = currentHour?.snowCm ?? 0;
	const currentSnowPrecipIn = (currentSnowPrecipCm * 0.393701).toFixed(2);
	const filteredAlerts = getAlerts(weatherData.alerts.alert, weatherData.location);
	const alertsLength = filteredAlerts.length ?? 0;
	const conditionLabel = mapConditions(
		weatherData.current.condition.code,
		weatherData.current.isDay,
		currentSource ?? 'weatherapi'
	);

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
				<SunriseCard data={weatherData.forecast.forecastday[0]?.astro.sunrise} />
				<SunsetCard data={weatherData.forecast.forecastday[0]?.astro.sunset} />
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
		<View className="w-full gap-4 self-center xl:px-24 2xl:px-56">
			<View className="flex-row items-start gap-4">
				<View className="flex-1 gap-4">
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
						cloudCover={weatherData.current.cloudCover}
						airQualityEU={airQualityData?.current.european_aqi}
						airQualityUS={airQualityData?.current.us_aqi}
						uv={weatherData.current.uv}
						maxWindKph={weatherData.forecast.forecastday[0].day.maxWindKph}
						avgRangeKm={weatherData.current.rangeKm}
						avgRangeMiles={weatherData.current.rangeMiles}
						dateEpoch={weatherData.forecast.forecastday[0].date_epoch}
					/>
					<HourlyForecast />
					<AirQuality />
				</View>
				<View className="flex-1 gap-4">
					<DailyForecast />
				</View>
			</View>
			<View className="flex-row flex-wrap items-center justify-between gap-4">
				{renderDataCardGrid()}
			</View>
		</View>
	);
};
