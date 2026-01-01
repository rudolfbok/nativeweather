export interface AirQualityData {
	current: {
		european_aqi: number;
		us_aqi: number;
		pm10: number;
		pm2_5: number;
		ozone: number;
		nitrogen_dioxide: number;
		carbon_monoxide: number;
	};
}
