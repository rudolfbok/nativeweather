import { formatTemperature, getRangeIndex, metricBounds } from '@/core';
import { Text } from '../../common/Text';
import { HumidityIcon } from '../../icons/main/HumidityIcon';
import { WeatherChart } from '../../weather/WeatherChart';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

const humidityRanges = ['0 - 20%', '20 - 40%', '40 - 60%', '60 - 80%', '80 - 100%'];

export const humidity: MetricDefinition = {
	Icon: HumidityIcon,
	titleKey: 'humidity.title',
	usesDate: true,
	card: ({ weather: { current }, t, currentTemp }) => ({
		value: `${current.humidity}%`,
		description: t(`description.humidity.${getRangeIndex(current.humidity, metricBounds.humidity)}`),
		extra: (
			<Text type="body" numberOfLines={1}>
				{t('humidity.dewpoint.title')}:{' '}
				{formatTemperature({ celsius: current.dewPointC, fahrenheit: current.dewPointF, currentTemp })}
			</Text>
		),
	}),
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
						getValue={(hour) => hour.humidity}
						seriesLabel={t('humidity.title')}
						color="metric-humidity"
						scale={{ max: 100 }}
						valueSuffix="%"
					/>
				}
				sections={[
					{ title: t('humidity.relativehumidity.title'), text: t('humidity.relativehumidity.text') },
					{
						title: t('humidity.relativehumidity.values'),
						valueClassName: 'text-metric-humidity',
						values: humidityRanges.map((value, level) => ({ name: t(`description.humidity.${level}`), value })),
					},
					{ title: t('humidity.dewpoint.title'), text: t('humidity.dewpoint.text') },
				]}
			/>
		);
	},
};
