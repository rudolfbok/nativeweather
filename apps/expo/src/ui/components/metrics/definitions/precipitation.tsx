import type { ForecastHour } from '@/core';
import { getNext24Hours, getRangeIndex, metricBounds } from '@/core';
import type { NormalizedData } from '@nativeweather/types';
import { useState } from 'react';
import { Text } from '../../common/Text';
import { RainIcon, SnowIcon } from '../../icons/main/MetricIcons';
import { WeatherChart } from '../../weather/WeatherChart';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

type Day = NormalizedData['forecast']['forecastday'][number]['day'];

const chanceRanges = ['0 - 10%', '10 - 30%', '30 - 50%', '50 - 70%', '70 - 90%', '90 - 100%'];

const kinds = {
	rain: {
		Icon: RainIcon,
		color: 'chart-blue',
		valueClassName: 'text-chart-blue!',
		amountKey: 'rainfall',
		metricUnit: 'mm',
		inchesPerUnit: 0.0393701,
		amountRanges: {
			metric: ['< 2mm', '2 - 10mm', '10 - 30mm', '30 - 50mm', '> 50mm'],
			imperial: ['< 0.08in', '0.08 - 0.40in', '0.40 - 1.20in', '1.20 - 2.00in', '> 2.00in'],
		},
		hourChance: (hour: ForecastHour) => hour.chanceOfRain,
		hourAmount: (hour: ForecastHour) => hour.precipMm,
		dayChance: (day: Day) => day.dailyRainChance,
		dayAmount: (day: Day) => day.totalPrecipMm,
		currentAmount: (weather: NormalizedData) => weather.current.precipMm,
	},
	snow: {
		Icon: SnowIcon,
		color: 'metric-snow',
		valueClassName: 'text-metric-snow',
		amountKey: 'snowfall',
		metricUnit: 'cm',
		inchesPerUnit: 0.393701,
		amountRanges: {
			metric: ['< 2cm', '2 - 10cm', '10 - 30cm', '30 - 50cm', '> 50cm'],
			imperial: ['< 0.8in', '0.8 - 4.0in', '4.0 - 12.0in', '12.0 - 20.0in', '> 20.0in'],
		},
		hourChance: (hour: ForecastHour) => hour.chanceOfSnow,
		hourAmount: (hour: ForecastHour) => hour.snowCm,
		dayChance: (day: Day) => day.dailySnowChance,
		dayAmount: (day: Day) => day.totalSnowCm,
		// Current conditions carry no snow amount, so the current hour's is used.
		currentAmount: (weather: NormalizedData) => getNext24Hours(weather)[0]?.snowCm ?? 0,
	},
};

type PrecipitationKind = keyof typeof kinds;

const getChance = (kind: PrecipitationKind, weather: NormalizedData, dayIndex: number | null) => {
	const day = dayIndex === null ? null : weather.forecast.forecastday[dayIndex]?.day;
	const hour = getNext24Hours(weather)[0];
	return day ? kinds[kind].dayChance(day) : hour ? kinds[kind].hourChance(hour) : 0;
};

/** Snow replaces the rain card when it is the likelier of the two, as in legacy. */
export const getPrecipitationMetric = (weather: NormalizedData, dayIndex: number | null): PrecipitationKind =>
	getChance('snow', weather, dayIndex) > getChance('rain', weather, dayIndex) ? 'snow' : 'rain';

const chanceKey = (kind: PrecipitationKind, level: number) =>
	kind === 'snow' && level === 2 ? 'precipitation.snow.chance.2' : `precipitation.chance.${level}`;

const createPrecipitation = (kind: PrecipitationKind): MetricDefinition => {
	const config = kinds[kind];
	const formatAmount = (metricAmount: number, isMetric: boolean) =>
		isMetric
			? `${metricAmount.toFixed(1)}${config.metricUnit}`
			: `${(metricAmount * config.inchesPerUnit).toFixed(2)}in`;

	return {
		Icon: config.Icon,
		titleKey: `${kind}.title`,
		usesDate: true,
		card: ({ weather, t, isMetric }, dayIndex) => {
			const day = dayIndex === null ? null : weather.forecast.forecastday[dayIndex]?.day;
			const chance = Math.round(getChance(kind, weather, dayIndex));
			const amount = formatAmount(day ? config.dayAmount(day) : config.currentAmount(weather), isMetric);

			return {
				value: `${chance}%`,
				description: t(chanceKey(kind, getRangeIndex(chance, metricBounds.precipitationChance))),
				// Hidden while the amount rounds to zero in the shown unit.
				extra: parseFloat(amount) > 0 && (
					<Text type="body" numberOfLines={1}>
						{t(`${kind}.${config.amountKey}`)} {amount}
					</Text>
				),
			};
		},
		Modal: ({ dayIndex, onSelectDay }) => {
			const context = useMetricContext();
			const [showAmount, setShowAmount] = useState(false);

			if (!context) return null;

			const { weather, t, isMetric } = context;
			const unit = isMetric ? config.metricUnit : 'in';
			const toUnit = (metricAmount: number) => (isMetric ? metricAmount : metricAmount * config.inchesPerUnit);
			const day = weather.forecast.forecastday[dayIndex]?.day;
			const amountSection = `${kind}.${config.amountKey}`;

			return (
				<MetricModal
					chart={
						<WeatherChart
							dayIndex={dayIndex}
							onSelectDay={onSelectDay}
							getValue={(hour) =>
								showAmount ? toUnit(config.hourAmount(hour)) : Math.round(config.hourChance(hour) / 5) * 5
							}
							seriesLabel={t(showAmount ? `${amountSection}.title` : `${kind}.title`)}
							color={config.color}
							scale={showAmount ? { step: isMetric ? 1 : 0.1 } : { max: 100 }}
							formatValue={showAmount ? (value) => value.toFixed(isMetric ? 1 : 2) : undefined}
							valueSuffix={showAmount ? unit : '%'}
							toggle={{
								options: ['%', unit],
								selected: showAmount ? unit : '%',
								onChange: (option) => setShowAmount(option === unit),
								dailySummary: {
									label: t(showAmount ? 'chart.dailyTotal' : 'chart.dailyChance'),
									value: !day
										? '--'
										: showAmount
											? formatAmount(config.dayAmount(day), isMetric)
											: `${Math.round(config.dayChance(day))}%`,
								},
							}}
						/>
					}
					sections={[
						{ title: t(`${kind}.chance.title`), text: t(`${kind}.chance.description`) },
						{
							title: t(`${kind}.chance.values`),
							valueClassName: config.valueClassName,
							values: chanceRanges.map((value, level) => ({
								name: t(chanceKey(kind, level)),
								value,
								description: t(`${kind}.chance.text.${level}`),
							})),
						},
						{ title: t(`${amountSection}.title`), text: t(`${amountSection}.description`) },
						{
							title: t(`${amountSection}.values`),
							valueClassName: config.valueClassName,
							values: config.amountRanges[isMetric ? 'metric' : 'imperial'].map((value, level) => ({
								name: t(`precipitation.${config.amountKey}.${level}`),
								value,
							})),
						},
					]}
				/>
			);
		},
	};
};

export const rain = createPrecipitation('rain');
export const snow = createPrecipitation('snow');
