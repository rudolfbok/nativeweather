export const fetchAirQuality = async (lat: number, lon: number) => {
	const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,us_aqi,pm10,pm2_5,ozone,nitrogen_dioxide,birch_pollen,grass_pollen,carbon_monoxide`;

	try {
		const response = await fetch(airQualityUrl);

		if (!response.ok) {
			throw new Error('Response is not okay');
		}

		const airQualityData = await response.json();

		return airQualityData;
	} catch (error) {
		console.error('Failed to fetch air quality data:', error);
	}
};
