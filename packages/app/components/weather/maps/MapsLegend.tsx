import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { useStorageString } from 'app/storage/useStorage';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { LegendGradient } from './LegendGradient';

const celsiusStops = [
	{ value: -50, color: '#000082' },
	{ value: -20, color: '#0078ff' },
	{ value: 0, color: '#96fffe' },
	{ value: 10, color: '#79ff77' },
	{ value: 20, color: '#ffff00' },
	{ value: 30, color: '#ff9600' },
	{ value: 40, color: '#ff0000' },
];

const fahrenheitStops = [
	{ value: -58, color: '#000082' },
	{ value: -4, color: '#0078ff' },
	{ value: 32, color: '#96fffe' },
	{ value: 50, color: '#79ff77' },
	{ value: 68, color: '#ffff00' },
	{ value: 86, color: '#ff9600' },
	{ value: 104, color: '#ff0000' },
];

const precipitationStops = [
	{ value: 0, color: '#eff6ff' },
	{ value: 4, color: '#4faaff' },
	{ value: 8, color: '#329bff' },
	{ value: 16, color: '#008cff' },
	{ value: 32, color: '#ffc800' },
	{ value: 64, color: '#ff5000' },
];

const precipitationLabelStops = precipitationStops.filter(({ value }) => value !== 4);

const windStops = [
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

const windLabelStops = windStops.filter(({ value }) => [0, 8.2, 17, 21, 29, 41, 51].includes(value));

type GradientStop = {
	value: number;
	color: string;
};

type GradientLegendProps = {
	description: string;
	stops: GradientStop[];
	labelStops?: GradientStop[];
	formatLabel: (value: number) => string;
	unit?: string;
};

const GradientLegend = ({ description, stops, labelStops = stops, formatLabel, unit }: GradientLegendProps) => {
	const minValue = stops[0].value;
	const maxValue = stops[stops.length - 1].value;
	const getStopLocation = (value: number) => (value - minValue) / (maxValue - minValue);
	const locations = stops.map((stop) => getStopLocation(stop.value)) as unknown as readonly [
		number,
		number,
		...number[],
	];
	const colors = stops.map((stop) => stop.color) as unknown as readonly [string, string, ...string[]];

	return (
		<View className={clsx('w-full')}>
			{/* <StyledText type="body">{description}</StyledText> */}
			<View className={clsx('relative mt-2 h-14 w-full overflow-hidden rounded-2xl')}>
				<LegendGradient colors={colors} locations={locations}>
					<View className={clsx('ml-1 mr-6 flex-1 flex-row items-center justify-between md:mr-7')}>
						{labelStops.map((stop, index) => (
							<View
								key={`${stop.value}-${index}`}
								className={clsx('absolute items-center')}
								style={{ left: `${getStopLocation(stop.value) * 100}%` }}
							>
								<StyledText type="bodysecondary" className={clsx('font-semibold !text-black')}>
									{formatLabel(stop.value)}
								</StyledText>
								<View className={clsx('h-4 w-[2px] bg-black')} />
							</View>
						))}
					</View>
				</LegendGradient>
			</View>
			{!!unit && (
				<StyledText type="bodysecondary" className={clsx('mt-1 text-right opacity-70')}>
					{unit}
				</StyledText>
			)}
		</View>
	);
};

export const MapsLegend = () => {
	const [currentTemp] = useStorageString('currentTemp');
	const { t } = useTranslate('weather');
	const stops = currentTemp === 'celsius' ? celsiusStops : fahrenheitStops;

	return (
		<GradientLegend description={t('maps.legend.temperature')} stops={stops} formatLabel={(value) => `${value}°`} />
	);
};

export const PrecipitationInfo = () => {
	const [currentUnits] = useStorageString('currentUnits');
	const { t } = useTranslate('weather');

	return (
		<GradientLegend
			description={t('maps.legend.precipitation')}
			stops={precipitationStops}
			labelStops={precipitationLabelStops}
			formatLabel={(value) =>
				switchMetrics({
					metric: `${value}`,
					imperial: `${(value / 25.4).toFixed(1)}`,
					currentUnits,
				})
			}
			unit={switchMetrics({ metric: 'mm/h', imperial: 'in/h', currentUnits })}
		/>
	);
};

export const WindInfo = () => {
	const [currentUnits] = useStorageString('currentUnits');
	const { t } = useTranslate('weather');

	return (
		<GradientLegend
			description={t('maps.legend.wind')}
			stops={windStops}
			labelStops={windLabelStops}
			formatLabel={(value) =>
				switchMetrics({
					metric: `${Math.round(value * 3.6)}`,
					imperial: `${Math.round(value * 3.6 * 0.621371)}`,
					currentUnits,
				})
			}
			unit={switchMetrics({ metric: 'km/h', imperial: 'mph', currentUnits })}
		/>
	);
};
