import { getRangeIndex, metricBounds } from '@nativeweather/core';
import { View } from 'react-native';
import { UVIcon } from '../../icons/main/MetricIcons';
import { GradientScale } from '../../weather/GradientScale';
import { WeatherChart } from '../../weather/WeatherChart';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

const scaleMax = 15;

const uvLevels = [
	{ range: '0 - 2', className: 'text-fair' },
	{ range: '3 - 5', className: 'text-moderate' },
	{ range: '6 - 7', className: 'text-sensitive' },
	{ range: '8 - 10', className: 'text-unhealthy' },
	{ range: '11+', className: 'text-very-unhealthy' },
];

export const uv: MetricDefinition = {
	Icon: UVIcon,
	titleKey: 'uv.title',
	usesDate: true,
	card: ({ weather, t }, dayIndex) => {
		const index = Math.round(
			dayIndex === null ? weather.current.uv : (weather.forecast.forecastday[dayIndex]?.day.uv ?? 0)
		);

		return {
			value: String(index),
			description: t(`description.uv.${getRangeIndex(index, metricBounds.uv)}`),
			extra: (
				<View className="mt-3 h-1 w-full justify-center">
					<GradientScale type="uv" label={t('uv.title')} />
					{index > 0 && (
						<View
							className="absolute h-4 w-1 -translate-x-1/2 rounded-full border border-card-background bg-label"
							style={{ left: `${Math.min(index / scaleMax, 1) * 100}%` }}
						/>
					)}
				</View>
			),
		};
	},
	Modal: ({ dayIndex, onSelectDay }) => {
		const context = useMetricContext();

		if (!context) return null;

		const { t } = context;

		return (
			<MetricModal
				chart={
					<WeatherChart
						dayIndex={dayIndex}
						onSelectDay={onSelectDay}
						getValue={(hour) => Math.round(hour.uv)}
						seriesLabel={t('uv.title')}
						color="metric-uv"
						scale={{ minimumMax: scaleMax, step: 5 }}
					/>
				}
				sections={[
					{ title: t('uv.radiation.title'), text: t('uv.radiation.description') },
					{ title: t('uv.index.title'), text: t('uv.index.description') },
					{
						title: t('uv.index.values'),
						values: uvLevels.map(({ range, className }, level) => ({
							name: t(`description.uv.${level}`),
							value: range,
							description: t(`uv.text.${level}`),
							className,
						})),
					},
				]}
			/>
		);
	},
};
