export interface CityCardWeather {
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
		isDay: 0 | 1;
		condition: {
			text: string;
			code: number;
		};
	};
	forecast: {
		forecastday: {
			day: {
				minTempC: number;
				minTempF: number;
				maxTempC: number;
				maxTempF: number;
			};
		}[];
	};
}
