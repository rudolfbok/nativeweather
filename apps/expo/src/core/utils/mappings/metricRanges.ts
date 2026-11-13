// Exclusive upper bounds per description level; a value at or above the last bound gets the final level.
export const metricBounds = {
	humidity: [20, 40, 60, 80],
	// Applied to the rounded index, so 0–2 is low and 11+ extreme (WHO bands).
	uv: [3, 6, 8, 11],
	cloudCover: [12, 50, 75],
	precipitationChance: [10, 30, 50, 70, 90],
	rangeKm: [1, 2, 4, 10, 20, 50],
	rangeMiles: [1, 2, 3, 6, 12, 30],
	// Beaufort scale; calm is below 1 km/h (1 mph).
	windKph: [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118],
	windMph: [1, 4, 8, 13, 19, 25, 32, 39, 47, 55, 64, 73],
	// Applied to the rounded hPa value for both units; the inHg labels are its conversions.
	pressureMb: [980, 996, 1006, 1013, 1021, 1026, 1036, 1046],
} as const;

export const getRangeIndex = (value: number, bounds: readonly number[]) => {
	const index = bounds.findIndex((bound) => value < bound);
	return index === -1 ? bounds.length : index;
};
