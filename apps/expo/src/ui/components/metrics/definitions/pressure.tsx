import { getRangeIndex, metricBounds } from '@/core';
import { PressureIcon } from '../../icons/main/PressureIcon';
import { WeatherChart } from '../../weather/WeatherChart';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

// Barometric levels: metric and imperial ranges plus a scale colour (data, not theme tokens).
const barometricScale = [
	['< 980hPa', '< 28.94inHg', '#E53935'],
	['980 - 995hPa', '28.94 - 29.38inHg', '#FB8C00'],
	['996 - 1005hPa', '29.41 - 29.68inHg', '#FDD835'],
	['1006 - 1012hPa', '29.71 - 29.88inHg', '#43A047'],
	['1013 - 1020hPa', '29.91 - 30.12inHg', '#1E88E5'],
	['1021 - 1025hPa', '30.15 - 30.27inHg', '#3949AB'],
	['1026 - 1035hPa', '30.30 - 30.56inHg', '#6A1B9A'],
	['1036 - 1045hPa', '30.59 - 30.86inHg', '#8E24AA'],
	['> 1045hPa', '> 30.86inHg', '#5D4037'],
] as const;

export const pressure: MetricDefinition = {
	Icon: PressureIcon,
	titleKey: 'pressure.title',
	usesDate: true,
	card: ({ weather: { current }, t, isMetric }) => {
		const level = isMetric
			? getRangeIndex(current.pressureMb, metricBounds.pressureMb)
			: getRangeIndex(current.pressureInHg, metricBounds.pressureInHg);

		return {
			value: isMetric ? `${Math.round(current.pressureMb)}hPa` : `${current.pressureInHg.toFixed(1)}inHg`,
			description: t(`description.pressure.${level}`),
		};
	},
	Modal: ({ dayIndex, onSelectDay }) => {
		const context = useMetricContext();

		if (!context) return null;

		const { t, isMetric } = context;

		return (
			<MetricModal
				chart={
					<WeatherChart
						dayIndex={dayIndex}
						onSelectDay={onSelectDay}
						getValue={(hour) => (isMetric ? hour.pressureMb : hour.pressureInHg)}
						seriesLabel={t('pressure.title')}
						color="metric-pressure"
						scale={{ step: isMetric ? 5 : 0.1 }}
						formatValue={(value) => (isMetric ? `${Math.round(value)}` : value.toFixed(1))}
						valueSuffix={isMetric ? 'hPa' : 'inHg'}
					/>
				}
				sections={[
					{ title: t('pressure.barometricscale.title'), text: t('pressure.barometricscale.text') },
					{
						title: t('pressure.barometricscale.values'),
						showIndex: true,
						values: barometricScale.map(([metric, imperial, color], level) => ({
							name: t(`description.pressure.${level}`),
							value: isMetric ? metric : imperial,
							description: t(`pressure.text.${level}`),
							color,
						})),
					},
				]}
			/>
		);
	},
};
