export interface CityCardWeather {
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
		is_day: 0 | 1;
		condition: {
			text: string;
			code: number;
		};
	};
}
