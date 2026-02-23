import { WeatherData } from 'app/types/weatherData';

const kphFromMs = (ms: number) => ms * 3.6;
const mphFromMs = (ms: number) => ms * 2.23694;
const milesFromMeters = (m: number) => m / 1609.34;
const inchesFromMm = (mm: number) => mm / 25.4;
const inHgFromHpa = (hpa: number) => hpa * 0.02953;

export const mapOpenWeatherApi = (data: any): WeatherData => {
	const locationInfo = data.location;
	const weatherData = data.weatherData;
	const latlon = data.latlon || { lat: 0, lng: 0 };

	const getMoonPhaseName = (phase: number): string => {
		if (phase === 0 || phase === 1) return 'New Moon';
		if (phase < 0.25) return 'Waxing Crescent';
		if (phase === 0.25) return 'First Quarter';
		if (phase < 0.5) return 'Waxing Gibbous';
		if (phase === 0.5) return 'Full Moon';
		if (phase < 0.75) return 'Waning Gibbous';
		if (phase === 0.75) return 'Last Quarter';
		return 'Waning Crescent';
	};

	return {
		location: {
			name: locationInfo.city,
			region: locationInfo.region ?? locationInfo.state,
			country: locationInfo.country,
			lat: latlon.lat,
			lon: latlon.lng,
			localtimeEpoch: Math.floor(Date.now() / 1000) + weatherData.timezone_offset,
			tzId: weatherData.timezone ?? 'UTC',
		},
		current: {
			tempC: weatherData.current.temp,
			tempF: weatherData.current.temp * 1.8 + 32,
			feelsLikeC: weatherData.current.feels_like,
			feelsLikeF: weatherData.current.feels_like * 1.8 + 32,
			dewPointC: weatherData.current.dew_point,
			dewPointF: weatherData.current.dew_point * 1.8 + 32,
			humidity: weatherData.current.humidity,
			precipMm: weatherData.current.rain?.['1h'] ?? 0,
			precipIn: inchesFromMm(weatherData.current.rain?.['1h'] ?? weatherData.current.snow?.['1h']),
			pressureMb: weatherData.current.pressure,
			pressureInHg: inHgFromHpa(weatherData.current.pressure),
			uv: weatherData.current.uvi,
			visibilityKm: weatherData.current.visibility / 1000,
			visibilityMiles: milesFromMeters(weatherData.current.visibility),
			windDegree: weatherData.current.wind_deg,
			windDir: '',
			windKph: kphFromMs(weatherData.current.wind_speed),
			windMph: mphFromMs(weatherData.current.wind_speed),
			gustKph: weatherData.current.wind_gust ? kphFromMs(weatherData.current.wind_gust) : 0,
			gustMph: weatherData.current.wind_gust ? mphFromMs(weatherData.current.wind_gust) : 0,
			cloudCover: weatherData.current.clouds,
			isDay: weatherData.current.weather?.[0].icon.endsWith('d') ? 1 : 0,
			condition: {
				text: weatherData.current.weather?.[0].description,
				code: weatherData.current.weather?.[0].id,
			},
		},
		forecast: {
			forecastday: (weatherData.daily ?? []).map((day: any) => ({
				date: new Date(day.dt * 1000).toISOString().split('T')[0],
				date_epoch: day.dt,
				day: {
					maxTempC: day.temp.max,
					maxTempF: day.temp.max * 1.8 + 32,
					minTempC: day.temp.min,
					minTempF: day.temp.min * 1.8 + 32,
					maxWindKph: kphFromMs(day.wind_speed),
					maxWindMph: mphFromMs(day.wind_speed),
					dailyRainChance: day.pop * 100,
					dailySnowChance: day.snow ? 100 : 0,
					dailyWillItSnow: day.snow ? 1 : 0,
					uv: day.uvi,
					avgVisKm: 0,
					avgVisMiles: 0,
					avgHumidity: day.humidity,
					totalPrecipMm: day.rain ?? day.snow,
					totalPrecipIn: inchesFromMm(day.rain ?? day.snow),
					totalSnowCm: day.snow ?? 0,
					condition: {
						text: day.weather?.[0].description,
						code: day.weather?.[0].id,
					},
				},
				hour: (weatherData.hourly ?? [])
					.filter((h: any) => new Date(h.dt * 1000).getDate() === new Date(day.dt * 1000).getDate())
					.map((hourData: any) => ({
						timeEpoch: hourData.dt,
						tempC: hourData.temp,
						tempF: hourData.temp * 1.8 + 32,
						isDay: hourData.weather?.[0].icon.endsWith('d') ? 1 : 0,
						uv: hourData.uvi,
						chanceOfRain: hourData.pop * 100,
						chanceOfSnow: hourData.snow ? 100 : 0,
						snowCm: hourData.snow,
						condition: {
							code: hourData.weather?.[0].id,
						},
					})),
				astro: {
					sunrise: new Date(day.sunrise * 1000).toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: true,
						timeZone: weatherData.timezone,
					}),
					sunset: new Date(day.sunset * 1000).toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: true,
						timeZone: weatherData.timezone,
					}),
					moonPhase: getMoonPhaseName(day.moon_phase),
					moonIllumunation: Math.round(day.moon_phase * 100),
					moonRise: new Date(day.moonrise * 1000).toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: true,
						timeZone: weatherData.timezone,
					}),
					moonSet: new Date(day.moonset * 1000).toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: true,
						timeZone: weatherData.timezone,
					}),
					isMoonUp: 0,
				},
			})),
		},
		alerts: {
			alert: weatherData.alerts ?? [],
		},
	};
};
