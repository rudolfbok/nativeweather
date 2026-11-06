// Exclusive upper bounds per description level; a value at or above the last bound gets the final level.
export const metricBounds = {
	humidity: [20, 40, 60, 80],
	// Applied to the rounded index, so 0–2 is low and 11+ extreme (WHO bands).
	uv: [3, 6, 8, 11],
	cloudCover: [13, 50, 75],
	precipitationChance: [10, 30, 50, 70, 90, 100],
	rangeKm: [1, 2, 4, 10, 20, 50],
	rangeMiles: [1, 2, 3, 6, 12, 30],
	// Beaufort scale; calm is below 1 km/h (1 mph).
	windKph: [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117],
	windMph: [1, 2, 7, 12, 18, 24, 31, 38, 46, 54, 63, 72],
	pressureMb: [980, 995, 1005, 1012, 1020, 1025, 1035, 1045],
	pressureInHg: [28.94, 29.38, 29.68, 29.88, 30.12, 30.27, 30.56, 30.86],
} as const;

export const getRangeIndex = (value: number, bounds: readonly number[]) => {
	const index = bounds.findIndex((bound) => value < bound);
	return index === -1 ? bounds.length : index;
};
