import { View } from 'react-native';
import { getPrecipitationMetric } from './definitions/precipitation';
import { MetricCard } from './MetricCard';
import { metricDefinitions } from './registry';
import type { MetricId } from './registry';
import { useMetricContext } from './useMetricContext';

interface MetricCardsProps {
	/** A forecast day shows its own four cards; omitted, the grid shows current conditions. */
	dayIndex?: number;
	/** `day` is set for metrics whose modal charts a day. */
	onOpen: (metric: MetricId, day?: number) => void;
}

export const MetricCards = ({ dayIndex, onOpen }: MetricCardsProps) => {
	const context = useMetricContext();

	if (!context) return null;

	const source = dayIndex ?? null;
	const precipitation = getPrecipitationMetric(context.weather, source);
	const metrics: MetricId[] =
		source === null
			? [precipitation, 'wind', 'uv', 'range', 'humidity', 'pressure', 'sunrise', 'sunset', 'clouds', 'moon']
			: [precipitation, 'uv', 'range', 'wind'];

	return (
		<View className="w-full flex-row flex-wrap gap-4">
			{metrics.map((metric) => {
				const definition = metricDefinitions[metric];
				return (
					<MetricCard
						key={metric}
						definition={definition}
						title={context.t(definition.titleKey)}
						content={definition.card(context, source)}
						onPress={() => onOpen(metric, definition.usesDate ? (dayIndex ?? 0) : undefined)}
					/>
				);
			})}
		</View>
	);
};
