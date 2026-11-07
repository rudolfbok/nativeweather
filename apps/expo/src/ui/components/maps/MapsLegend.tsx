import { selectUnit, useStorageString } from '@/core';
import type { WeatherMapLayer } from '@/core';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Text } from '../common/Text';

type Stop = { value: number; color: string };

// Colours match the WeatherAPI raster tiles, so they are data rather than theme tokens.
const celsiusStops: Stop[] = [
	{ value: -50, color: '#000082' },
	{ value: -20, color: '#0078ff' },
	{ value: 0, color: '#96fffe' },
	{ value: 10, color: '#79ff77' },
	{ value: 20, color: '#ffff00' },
	{ value: 30, color: '#ff9600' },
	{ value: 40, color: '#ff0000' },
];

const fahrenheitStops: Stop[] = celsiusStops.map(({ value, color }) => ({
	value: Math.round(value * 1.8 + 32),
	color,
}));

const precipitationStops: Stop[] = [
	{ value: 0, color: '#eff6ff' },
	{ value: 4, color: '#4faaff' },
	{ value: 8, color: '#329bff' },
	{ value: 16, color: '#008cff' },
	{ value: 32, color: '#ffc800' },
	{ value: 64, color: '#ff5000' },
];

const windStops: Stop[] = [
	{ value: 0, color: '#fdfeff' },
	{ value: 3.1, color: '#b7d9ff' },
	{ value: 8.2, color: '#7fbcff' },
	{ value: 11, color: '#66afff' },
	{ value: 14, color: '#4aa1ff' },
	{ value: 17, color: '#2f92ff' },
	{ value: 21, color: '#ffdb00' },
	{ value: 25, color: '#ffae00' },
	{ value: 29, color: '#fd7300' },
	{ value: 33, color: '#e90004' },
	{ value: 41, color: '#c20051' },
	{ value: 51, color: '#8c0078' },
];

const labelled = (stops: Stop[], values: number[]) => stops.filter(({ value }) => values.includes(value));

type GradientStyle = ViewStyle & { backgroundImage: string };

const GradientLegend = ({
	stops,
	labelStops = stops,
	formatLabel,
	unit,
}: {
	stops: Stop[];
	labelStops?: Stop[];
	formatLabel: (value: number) => string;
	unit?: string;
}) => {
	const min = stops[0].value;
	const max = stops[stops.length - 1].value;
	const location = (value: number) => ((value - min) / (max - min)) * 100;
	const style: GradientStyle = {
		flex: 1,
		backgroundImage: `linear-gradient(90deg, ${stops.map((stop) => `${stop.color} ${location(stop.value)}%`).join(', ')})`,
	};

	return (
		<View className="w-full">
			<View className="relative mt-2 h-14 w-full overflow-hidden rounded-2xl">
				<View style={style}>
					<View className="mr-6 ml-1 flex-1 md:mr-7">
						{labelStops.map((stop) => (
							<View key={stop.value} className="absolute items-center" style={{ left: `${location(stop.value)}%` }}>
								<Text type="caption" className="font-semibold text-black!">
									{formatLabel(stop.value)}
								</Text>
								<View className="h-4 w-[2px] bg-black" />
							</View>
						))}
					</View>
				</View>
			</View>
			{!!unit && (
				<Text type="caption" className="mt-1 text-right opacity-70">
					{unit}
				</Text>
			)}
		</View>
	);
};

const TemperatureInfo = () => {
	const [currentTemp] = useStorageString('currentTemp');

	return (
		<GradientLegend
			stops={currentTemp === 'fahrenheit' ? fahrenheitStops : celsiusStops}
			formatLabel={(value) => `${value}°`}
		/>
	);
};

const PrecipitationInfo = () => {
	const [currentUnits] = useStorageString('currentUnits');

	return (
		<GradientLegend
			stops={precipitationStops}
			labelStops={precipitationStops.filter(({ value }) => value !== 4)}
			formatLabel={(value) =>
				selectUnit({ metric: `${value}`, imperial: `${(value / 25.4).toFixed(1)}`, currentUnits })
			}
			unit={selectUnit({ metric: 'mm/h', imperial: 'in/h', currentUnits })}
		/>
	);
};

const WindInfo = () => {
	const [currentUnits] = useStorageString('currentUnits');

	return (
		<GradientLegend
			stops={windStops}
			labelStops={labelled(windStops, [0, 8.2, 17, 21, 29, 41, 51])}
			formatLabel={(value) =>
				selectUnit({
					metric: `${Math.round(value * 3.6)}`,
					imperial: `${Math.round(value * 3.6 * 0.621371)}`,
					currentUnits,
				})
			}
			unit={selectUnit({ metric: 'km/h', imperial: 'mph', currentUnits })}
		/>
	);
};

export const MapsLegend = ({ layer }: { layer: WeatherMapLayer }) =>
	layer === 'precip' ? <PrecipitationInfo /> : layer === 'wind' ? <WindInfo /> : <TemperatureInfo />;
