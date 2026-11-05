export type Pollutant = 'euaqi' | 'usaqi' | 'pm25' | 'pm10' | 'o3' | 'no2';

// Upper bounds (exclusive) per level; the last level covers everything above.
const thresholds: Record<Pollutant, [max: number, color: string][]> = {
	euaqi: [
		[20, '#4FF0E6'],
		[40, '#009900'],
		[60, '#FFC100'],
		[80, '#FF9900'],
		[100, '#FF0000'],
		[Infinity, '#990099'],
	],
	usaqi: [
		[50, '#009900'],
		[100, '#FFC100'],
		[150, '#FF6F00'],
		[200, '#FF0000'],
		[300, '#960132'],
		[Infinity, '#990099'],
	],
	pm25: [
		[15, '#009900'],
		[25, '#FFC100'],
		[40, '#FF6F00'],
		[65, '#FF0000'],
		[100, '#990099'],
		[Infinity, '#960132'],
	],
	pm10: [
		[30, '#009900'],
		[50, '#FFC100'],
		[80, '#FF6F00'],
		[120, '#FF0000'],
		[200, '#990099'],
		[Infinity, '#960132'],
	],
	o3: [
		[120, '#009900'],
		[160, '#FFC100'],
		[240, '#FF6F00'],
		[320, '#FF0000'],
		[440, '#960132'],
		[Infinity, '#990099'],
	],
	no2: [
		[40, '#009900'],
		[80, '#FFC100'],
		[150, '#FF6F00'],
		[250, '#FF0000'],
		[400, '#960132'],
		[Infinity, '#990099'],
	],
};

export const getAirQualityColor = (pollutant: Pollutant, value: number) =>
	thresholds[pollutant].find(([max]) => value < max)?.[1] ?? '#007AFF';
