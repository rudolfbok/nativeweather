import type { NormalizedData } from '@nativeweather/types/normalizedData';
import { useState } from 'react';
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
} from '../../cards';
import { getHour24FromEpoch } from '../hourly/getHour24FromEpoch';

export const WeatherDataCards = ({
	weatherData,
	includeClouds = false,
}: {
	weatherData: NormalizedData;
	includeClouds?: boolean;
}) => {
	const [now] = useState(() => new Date());
	const timeZone = weatherData.location.tzId || 'UTC';
	const hourNow = Number.parseInt(
		new Intl.DateTimeFormat('en-US', { hour: '2-digit', hour12: false, timeZone }).format(now),
		10
	);
	const currentHour =
		weatherData.forecast.forecastday[0].hour.find((hour) => getHour24FromEpoch(hour.timeEpoch, timeZone) === hourNow) ??
		weatherData.forecast.forecastday[0].hour[0];
	const snowChance = currentHour?.chanceOfSnow ?? 0;
	const rainChance = currentHour?.chanceOfRain ?? 0;

	return (
		<>
			{snowChance > rainChance ? (
				<SnowCard
					snowChance={snowChance}
					snowPrecipCm={currentHour?.snowCm ?? 0}
					snowPrecipIn={Number(((currentHour?.snowCm ?? 0) * 0.393701).toFixed(2))}
				/>
			) : (
				<RainCard
					rainChance={rainChance}
					rainPrecipMm={weatherData.current.precipMm}
					rainPrecipIn={weatherData.current.precipIn}
				/>
			)}
			<WindCard
				windKm={Math.round(weatherData.current.windKph)}
				windMil={Math.round(weatherData.current.windMph)}
				degree={weatherData.current.windDegree}
				details={true}
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
				timeZone={timeZone}
			/>
			<SunsetCard
				data={weatherData.forecast.forecastday[0]?.astro.sunset}
				tomorrowData={weatherData.forecast.forecastday[1]?.astro.sunset}
				timeZone={timeZone}
			/>
			{includeClouds && <CloudsCard data={weatherData.current.cloudCover} />}
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
