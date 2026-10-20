'use client';

import { AirQuality } from '../../airquality/AirQuality';
import { AlertWeather } from '../../alerts/AlertWeather';
import { DailyForecast } from '../daily/DailyForecast';
import { MainWeather } from '../main/MainWeather';
import { useMapConditions } from '@nativeweather/ui/hooks/conditions/useMapConditions';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { getAlerts } from '@nativeweather/core/utils/alertFilters';
import { View } from 'react-native';
import { WeatherDataCards } from './WeatherDataCards';
import { HourlyForecast } from '../hourly/HourlyForecast';
import { SmartSummary } from '../SmartSummary';
import { MapsView } from '../../maps/views/MapsView';

export const HeroWeather = () => {
	const { weatherData } = useWeather();
	const mapConditions = useMapConditions();

	if (!weatherData) return null;

	const filteredAlerts = getAlerts(weatherData.alerts.alert, weatherData.location);
	const alertsLength = filteredAlerts.length ?? 0;
	const conditionLabel = mapConditions(weatherData.current.condition.code, weatherData.current.isDay);

	return (
		<View className="w-full gap-4 self-center">
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
						uv={weatherData.forecast.forecastday[0].day.uv}
						maxWindKph={weatherData.forecast.forecastday[0].day.maxWindKph}
						avgRangeKm={weatherData.forecast.forecastday[0].day.avgVisKm}
						avgRangeMiles={weatherData.forecast.forecastday[0].day.avgVisMiles}
						dateEpoch={weatherData.forecast.forecastday[0].date_epoch}
						conditionCodes={weatherData.forecast.forecastday[0].hour.map((hour) => hour.condition.code)}
					/>
					<HourlyForecast />
					<AirQuality />
				</View>
				<View className="flex-1 gap-4">
					<DailyForecast />
					<MapsView />
				</View>
			</View>
			<View className="flex-row flex-wrap items-center justify-between gap-4">
				<WeatherDataCards weatherData={weatherData} includeClouds={true} />
			</View>
		</View>
	);
};
