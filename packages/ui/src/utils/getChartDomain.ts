// Match the chart's four-interval tick spacing so both bounds have labels.
export const getChartDomain = (min: number, max: number): { min: number; max: number } => {
	if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) return { min: 0, max: 1 };

	let lower = min;
	let upper = max;
	for (let index = 0; index < 10; index++) {
		const rawStep = (upper - lower) / 4;
		const power = 10 ** Math.floor(Math.log10(rawStep));
		const error = rawStep / power;
		const factor = error >= Math.sqrt(50) ? 10 : error >= Math.sqrt(10) ? 5 : error >= Math.sqrt(2) ? 2 : 1;
		const step = factor * power;
		const nextLower = Number((Math.floor(lower / step) * step).toPrecision(12));
		const nextUpper = Number((Math.ceil(upper / step) * step).toPrecision(12));
		if (nextLower === lower && nextUpper === upper) break;
		lower = nextLower;
		upper = nextUpper;
	}
	// Keep floating-point division from dropping a boundary tick (e.g. 1.245 / 0.005).
	return {
		min: lower === 0 ? 0 : lower - Math.abs(lower) * Number.EPSILON * 4,
		max: upper + Math.abs(upper) * Number.EPSILON * 4,
	};
};
