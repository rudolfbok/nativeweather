import { getRangeIndex, metricBounds } from '@nativeweather/core';
import { CloudsIcon } from '../../icons/main/MetricIcons';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

const coverLevels = [
	{ range: '0 - 12%', className: 'opacity-100' },
	{ range: '12 - 50%', className: 'opacity-80' },
	{ range: '50 - 75%', className: 'opacity-60' },
	{ range: '75 - 100%', className: 'opacity-40' },
];

export const clouds: MetricDefinition = {
	Icon: CloudsIcon,
	titleKey: 'cloudcover.title',
	wide: true,
	card: ({ weather: { current }, t }) => ({
		value: `${current.cloudCover}%`,
		description: t(`description.cloudcover.${getRangeIndex(current.cloudCover, metricBounds.cloudCover)}`),
	}),
	Modal: () => {
		const context = useMetricContext();

		if (!context) return null;

		const { t } = context;

		return (
			<MetricModal
				sections={[
					{ title: t('cloudcover.percentage.title'), text: t('cloudcover.percentage.text') },
					{
						title: t('cloudcover.percentage.values'),
						values: coverLevels.map(({ range, className }, level) => ({
							name: t(`description.cloudcover.${level}`),
							value: range,
							className,
						})),
					},
				]}
			/>
		);
	},
};
