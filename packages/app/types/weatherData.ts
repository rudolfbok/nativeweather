import { WeatherAlert } from './weatherAlert';

export interface WeatherData {
	location: {
		name: string;
		region: string;
		country: string;
		lat: number;
		lon: number;
		localtime_epoch: number;
		tz_id: string;
	};
	current: {
		temp_c: number;
		temp_f: number;
		feelslike_c: number;
		feelslike_f: number;
		dewpoint_c: number;
		dewpoint_f: number;
		humidity: number;
		precip_in: number;
		precip_mm: number;
		pressure_in: number;
		pressure_mb: number;
		uv: number;
		vis_km: number;
		vis_miles: number;
		wind_degree: number;
		wind_dir: string;
		wind_kph: number;
		wind_mph: number;
		gust_kph: number;
		gust_mph: number;
		cloud: number;
		is_day: 0 | 1;
		condition: {
			text: string;
			code: number;
		};
	};
	forecast: {
		forecastday: {
			date: string;
			date_epoch: number;
			day: {
				maxtemp_c: number;
				maxtemp_f: number;
				mintemp_c: number;
				mintemp_f: number;
				maxwind_kph: number;
				maxwind_mph: number;
				daily_chance_of_rain: number;
				daily_chance_of_snow: number;
				daily_will_it_snow: 0 | 1;
				uv: number;
				avgvis_km: number;
				avgvis_miles: number;
				avghumidity: number;
				totalprecip_mm: number;
				totalprecip_in: number;
				totalsnow_cm: number;
				condition: {
					text: string;
					code: number;
				};
			};
			hour: {
				time_epoch: number;
				temp_c: number;
				temp_f: number;
				is_day: 0 | 1;
				uv: number;
				chance_of_rain: number;
				chance_of_snow: number;
				snow_cm: number;
				condition: {
					code: number;
				};
			}[];
			astro: {
				sunrise: string;
				sunset: string;
				moon_phase: string;
				moon_illumination: number;
				moonrise: string;
				moonset: string;
				is_moon_up: 0 | 1;
			};
		}[];
	};
	alerts: {
		alert: WeatherAlert[];
	};
}
