type Range = {
	max: number;
	color: string;
};

const getColorByRanges = (value: number, ranges: Range[], fallback = '#007AFF'): string => {
	return ranges.find((range) => value < range.max)?.color ?? fallback;
};

export const EUAQIIndicatorColor = (value: number): string => {
	const ranges: Range[] = [
		{ max: 20, color: '#4FF0E6' },
		{ max: 40, color: '#009900' },
		{ max: 60, color: '#FFC100' },
		{ max: 80, color: '#FF9900' },
		{ max: 100, color: '#FF0000' },
		{ max: Infinity, color: '#990099' },
	];

	return getColorByRanges(value, ranges);
};

export const USAQIIndicatorColor = (value: number): string => {
	const ranges: Range[] = [
		{ max: 50, color: '#009900' },
		{ max: 100, color: '#FFC100' },
		{ max: 150, color: '#FF6F00' },
		{ max: 200, color: '#FF0000' },
		{ max: 300, color: '#960132' },
		{ max: Infinity, color: '#990099' },
	];

	return getColorByRanges(value, ranges);
};

export const PM25IndicatorColor = (value: number): string => {
	const ranges: Range[] = [
		{ max: 15, color: '#009900' },
		{ max: 25, color: '#FFC100' },
		{ max: 40, color: '#FF6F00' },
		{ max: 65, color: '#FF0000' },
		{ max: 100, color: '#990099' },
		{ max: Infinity, color: '#960132' },
	];

	return getColorByRanges(value, ranges);
};

export const PM10IndicatorColor = (value: number): string => {
	const ranges: Range[] = [
		{ max: 30, color: '#009900' },
		{ max: 50, color: '#FFC100' },
		{ max: 80, color: '#FF6F00' },
		{ max: 120, color: '#FF0000' },
		{ max: 200, color: '#990099' },
		{ max: Infinity, color: '#960132' },
	];

	return getColorByRanges(value, ranges);
};

export const OzoneIndicatorColor = (value: number): string => {
	const ranges: Range[] = [
		{ max: 120, color: '#009900' },
		{ max: 160, color: '#FFC100' },
		{ max: 240, color: '#FF6F00' },
		{ max: 320, color: '#FF0000' },
		{ max: 440, color: '#960132' },
		{ max: Infinity, color: '#990099' },
	];

	return getColorByRanges(value, ranges);
};

export const NO2IndicatorColor = (value: number): string => {
	const ranges: Range[] = [
		{ max: 40, color: '#009900' },
		{ max: 80, color: '#FFC100' },
		{ max: 150, color: '#FF6F00' },
		{ max: 250, color: '#FF0000' },
		{ max: 400, color: '#960132' },
		{ max: Infinity, color: '#990099' },
	];

	return getColorByRanges(value, ranges);
};
