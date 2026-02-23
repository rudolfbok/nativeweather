'use client';

import {
	HumidityCard,
	MoonCard,
	PressureCard,
	RainCard,
	SnowCard,
	SunriseCard,
	SunsetCard,
	UVIndexCard,
	VisibilityCard,
	WindCard,
} from 'app/components/cards';
import { AirQuality } from 'app/components/weather/airquality/AirQuality';
import { AlertWeather } from 'app/components/weather/alerts/AlertWeather';
import { DailyForecast } from 'app/components/weather/daily/DailyForecast';
import { MainWeather } from 'app/components/weather/main/MainWeather';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useWeather } from 'app/hooks/useWeather';
import { isCityInFavorites } from 'app/storage/crudMMKVService';
import { WeatherAlert } from 'app/types/weatherAlert';
import { cityFromWeather } from 'app/utils/helpers/cityFromWeather';
import { clsx } from 'clsx';
import { Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { CloudsCard } from '../cards/CloudsCard';
import { HourlyForecast } from './hourly/HourlyForecast';
import { MapsView } from './maps/MapsView.web';
import { SmartSummary } from './SmartSummary';
import { useStorageString } from 'app/storage/useStorageString';
import { useMapConditions } from 'app/utils/mappings/mapConditions';

export const HeroWeather = () => {
	const { weatherData, airQualityData } = useWeather();
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();
	const mapConditions = useMapConditions();
	const [currentSource] = useStorageString('currentSource');

	useEffect(() => {
		if (!weatherData) return;

		const city = cityFromWeather(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [weatherData]);

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

	const currentIndex = weatherData.forecast.forecastday[0].hour.findIndex(
		(hour: any) => getHour24FromEpoch(hour.timeEpoch, tzId) === currentHour24
	);

	const currentRainChance = weatherData.forecast.forecastday[0].hour[currentIndex].chanceOfRain;
	const currentSnowChance = weatherData.forecast.forecastday[0].hour[currentIndex].chanceOfSnow;
	const currentSnowPrecipCm = weatherData.forecast.forecastday[0].hour[currentIndex].snowCm;
	const currentSnowPrecipIn = (currentSnowPrecipCm * 0.393701).toFixed(2);

	const filteredAlerts: WeatherAlert[] = weatherData.alerts.alert.filter(
		(alert, index, self) => index === self.findIndex((a) => a.msgtype === 'Alert')
	);

	const alertsLength = filteredAlerts.length ?? 0;

	const conditionLabel = mapConditions(weatherData.current.condition.code, weatherData.current.isDay, currentSource);

	const DataCardGrid = () => {
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
					dir={weatherData.current.windDir}
					degree={weatherData.current.windDegree}
					details={true}
					currentWind={true}
				/>
				<UVIndexCard data={weatherData.current.uv} />
				<VisibilityCard visKm={weatherData.current.visibilityKm} visMiles={weatherData.current.visibilityMiles} />
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
					illumination={weatherData.forecast.forecastday[0].astro.moonIllumunation}
					isMoonUp={weatherData.forecast.forecastday[0].astro.isMoonUp}
					moonrise={weatherData.forecast.forecastday[0].astro.moonRise ?? ''}
					moonset={weatherData.forecast.forecastday[0].astro.moonSet ?? ''}
				/>
			</>
		);
	};

	return (
		<View className={clsx('ios:px-4 pb-4')}>
			<View className={clsx('grid select-none grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}>
				<View className={clsx('flex-col gap-4')}>
					<View>
						<View>
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
								conditionbg={false}
								textColor="!text-white"
								arrowcolor="white"
								displayTime={true}
								strokeWidth={0}
							/>
							<Pressable
								onPress={() => handleFavoriteToggle(cityFromWeather(weatherData))}
								className={clsx('ios:hidden absolute bottom-0 right-0 lg:p-2')}
							>
								<Star color="#FE9804" fill={isFavorite ? '#FE9804' : 'transparent'} size={30} />
							</Pressable>
							<AlertWeather
								filteredAlerts={filteredAlerts}
								alertsLength={alertsLength}
								desktop="max-lg:hidden"
								mobile="hidden"
							/>
						</View>
					</View>
					<AlertWeather
						filteredAlerts={filteredAlerts}
						alertsLength={alertsLength}
						desktop="hidden"
						mobile="lg:hidden"
					/>
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
					/>
					<HourlyForecast />
					<AirQuality className={clsx('xl:hidden')} />
				</View>
				<View className={clsx('gap-4')}>
					<DailyForecast />
					{Platform.OS === 'web' && <MapsView />}
				</View>
				<View
					className={clsx(
						'flex flex-row flex-wrap justify-between gap-4',
						'web:grid web:h-fit web:grid-cols-2 web:md:hidden web:xl:grid web:xl:grid-cols-3 '
					)}
				>
					<AirQuality className={clsx('max-xl:hidden')} />
					<DataCardGrid />
				</View>
			</View>
			<View className={clsx('ios:hidden', 'mt-4 hidden h-fit grid-cols-4 gap-4 md:grid xl:hidden')}>
				<DataCardGrid />
			</View>
		</View>
	);
};
