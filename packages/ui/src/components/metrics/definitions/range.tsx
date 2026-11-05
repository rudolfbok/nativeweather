import { getRangeIndex, metricBounds } from '@nativeweather/core';
import { RangeIcon } from '../../icons/main/RangeIcon';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

const rangeScale = {
	metric: ['0 - 1km', '1 - 2km', '2 - 4km', '4 - 10km', '10 - 20km', '20 - 50km', '> 50km'],
	imperial: ['0 - 1mi', '1 - 2mi', '2 - 3mi', '3 - 6mi', '6 - 12mi', '12 - 30mi', '> 30mi'],
};

export const range: MetricDefinition = {
	Icon: RangeIcon,
	titleKey: 'range.title',
	card: ({ weather, t, isMetric }, dayIndex) => {
		const day = dayIndex === null ? null : weather.forecast.forecastday[dayIndex]?.day;
		const distance = Math.round(
			isMetric ? (day?.avgVisKm ?? weather.current.rangeKm) : (day?.avgVisMiles ?? weather.current.rangeMiles)
		);
		const level = getRangeIndex(distance, isMetric ? metricBounds.rangeKm : metricBounds.rangeMiles);

		return { value: `${distance}${isMetric ? 'km' : 'mi'}`, description: t(`description.range.${level}`) };
	},
	Modal: () => {
		const context = useMetricContext();

		if (!context) return null;

		const { t, isMetric } = context;

		return (
			<MetricModal
				sections={[
					{ title: t('modal.description'), text: t('range.text') },
					{
						title: t('range.values'),
						valueClassName: 'text-metric-range',
						values: rangeScale[isMetric ? 'metric' : 'imperial'].map((value, level) => ({
							name: t(`description.range.${level}`),
							value,
						})),
					},
				]}
			/>
		);
	},
};
