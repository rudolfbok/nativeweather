export type Pollutant = 'euaqi' | 'usaqi' | 'pm25' | 'pm10' | 'o3' | 'no2';

export type AirQualityLevel = 'good' | 'fair' | 'moderate' | 'sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';

const usLevels: AirQualityLevel[] = ['fair', 'moderate', 'sensitive', 'unhealthy', 'very-unhealthy', 'hazardous'];

// Exclusive upper bound of every level except the last, which covers everything above.
const scales: Record<Pollutant, { levels: AirQualityLevel[]; bounds: number[] }> = {
	euaqi: {
		levels: ['good', 'fair', 'moderate', 'sensitive', 'unhealthy', 'very-unhealthy'],
		bounds: [20, 40, 60, 80, 100],
	},
	usaqi: { levels: usLevels, bounds: [50, 100, 150, 200, 300] },
	pm25: { levels: usLevels, bounds: [15, 25, 40, 65, 100] },
	pm10: { levels: usLevels, bounds: [30, 50, 80, 120, 200] },
	o3: { levels: usLevels, bounds: [120, 160, 240, 320, 440] },
	no2: { levels: usLevels, bounds: [40, 80, 150, 250, 400] },
};

export const getAirQualityLevel = (pollutant: Pollutant, value: number): AirQualityLevel => {
	const { levels, bounds } = scales[pollutant];
	const index = bounds.findIndex((max) => value < max);
	return levels[index === -1 ? levels.length - 1 : index];
};
