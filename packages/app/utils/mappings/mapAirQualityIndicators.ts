export const EUAQIIndicatorColor = (value: number): string => {
	const euAQIranges = [
		{ min: 0, max: 20, color: '#4FF0E6' },
		{ min: 20, max: 40, color: '#009900' },
		{ min: 40, max: 60, color: '#FFC100' },
		{ min: 60, max: 80, color: '#FF9900' },
		{ min: 80, max: 100, color: '#FF0000' },
		{ min: 100, max: Infinity, color: '#990099' },
	];

	for (const range of euAQIranges) {
		if (value >= range.min && value < range.max) {
			return range.color;
		}
	}
	return '#007AFF';
};

export const USAQIIndicatorColor = (value: number): string => {
	const usAQIranges = [
		{ min: 0, max: 50, color: '#009900' },
		{ min: 50, max: 100, color: '#FFC100' },
		{ min: 100, max: 150, color: '#FF6F00' },
		{ min: 150, max: 200, color: '#FF0000' },
		{ min: 200, max: 300, color: '#960132' },
		{ min: 300, max: Infinity, color: '#990099' },
	];

	for (const range of usAQIranges) {
		if (value >= range.min && value < range.max) {
			return range.color;
		}
	}
	return '#007AFF';
};

export const PM25IndicatorColor = (value: number): string => {
	const PM25ranges = [
		{ min: 0, max: 15, color: '#009900' },
		{ min: 15, max: 25, color: '#FFC100' },
		{ min: 25, max: 40, color: '#FF6F00' },
		{ min: 40, max: 65, color: '#FF0000' },
		{ min: 65, max: 100, color: '#990099' },
		{ min: 100, max: Infinity, color: '#960132' },
	];

	for (const range of PM25ranges) {
		if (value >= range.min && value < range.max) {
			return range.color;
		}
	}
	return '#007AFF';
};

export const PM10IndicatorColor = (value: number): string => {
	const PM10ranges = [
		{ min: 0, max: 30, color: '#009900' },
		{ min: 30, max: 50, color: '#FFC100' },
		{ min: 50, max: 80, color: '#FF6F00' },
		{ min: 80, max: 120, color: '#FF0000' },
		{ min: 120, max: 200, color: '#990099' },
		{ min: 200, max: Infinity, color: '#960132' },
	];

	for (const range of PM10ranges) {
		if (value >= range.min && value < range.max) {
			return range.color;
		}
	}
	return '#007AFF';
};

export const OzoneIndicatorColor = (value: number): string => {
	const OzoneRanges = [
		{ min: 0, max: 120, color: '#009900' },
		{ min: 120, max: 160, color: '#FFC100' },
		{ min: 160, max: 240, color: '#FF6F00' },
		{ min: 240, max: 320, color: '#FF0000' },
		{ min: 320, max: 440, color: '#960132' },
		{ min: 440, max: Infinity, color: '#990099' },
	];

	for (const range of OzoneRanges) {
		if (value >= range.min && value < range.max) {
			return range.color;
		}
	}
	return '#007AFF';
};

export const NO2IndicatorColor = (value: number): string => {
	const NO2Ranges = [
		{ min: 0, max: 40, color: '#009900' },
		{ min: 40, max: 80, color: '#FFC100' },
		{ min: 80, max: 150, color: '#FF6F00' },
		{ min: 150, max: 250, color: '#FF0000' },
		{ min: 250, max: 400, color: '#960132' },
		{ min: 400, max: Infinity, color: '#990099' },
	];

	for (const range of NO2Ranges) {
		if (value >= range.min && value < range.max) {
			return range.color;
		}
	}
	return '#007AFF';
};
