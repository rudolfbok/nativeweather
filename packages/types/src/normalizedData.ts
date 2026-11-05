import type { WeatherAlert } from './weatherAPI';

export interface NormalizedData {
	location: {
		name: string;
		region: string;
		country: string;
		lat: number;
		lon: number;
		localtimeEpoch: number;
		tzId: string;
	};
	current: {
		tempC: number;
		tempF: number;
		feelsLikeC: number;
		feelsLikeF: number;
		dewPointC: number;
		dewPointF: number;
		humidity: number;
		precipIn: number;
		precipMm: number;
		pressureInHg: number;
		pressureMb: number;
		uv: number;
		rangeKm: number;
		rangeMiles: number;
		windDegree: number;
		windDir: string;
		windKph: number;
		windMph: number;
		gustKph: number;
		gustMph: number;
		cloudCover: number;
		isDay: 0 | 1;
		condition: {
			code: number;
		};
	};
	forecast: {
		forecastday: {
			date: string;
			date_epoch: number;
			day: {
				maxTempC: number;
				maxTempF: number;
				minTempC: number;
				minTempF: number;
				maxWindKph: number;
				maxWindMph: number;
				dailyRainChance: number;
				dailySnowChance: number;
				uv: number;
				avgVisKm: number;
				avgVisMiles: number;
				totalPrecipMm: number;
				totalPrecipIn: number;
				totalSnowCm: number;
				condition: {
					code: number;
				};
			};
			hour: {
				timeEpoch: number;
				time: string;
				tempC: number;
				tempF: number;
				isDay: 0 | 1;
				uv: number;
				chanceOfRain: number;
				chanceOfSnow: number;
				snowCm: number;
				precipMm: number;
				humidity: number;
				pressureMb: number;
				pressureInHg: number;
				rangeKm: number;
				rangeMiles: number;
				windKph: number;
				windMph: number;
				condition: {
					code: number;
				};
			}[];
			astro: {
				sunrise: string;
				sunset: string;
				moonPhase: string;
				moonIllumination: number;
				moonRise: string;
				moonSet: string;
				isMoonUp: 0 | 1;
			};
		}[];
	};
	alerts: {
		alert: WeatherAlert[];
	};
}
