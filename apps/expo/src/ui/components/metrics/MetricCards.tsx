import { View } from 'react-native';
import { clsx } from 'clsx';
import { Skeleton } from '../common/Skeleton';
import { getPrecipitationMetric } from './definitions/precipitation';
import { MetricCard, metricCellClassName } from './MetricCard';
import type { MetricLayout } from './MetricCard';
import { metricDefinitions } from './registry';
import type { MetricId } from './registry';
import { useMetricContext } from './useMetricContext';

interface MetricCardsProps {
	/** A forecast day shows its own four cards; omitted, the grid shows current conditions. */
	dayIndex?: number;
	/** `day` is set for metrics whose modal charts a day. */
	onOpen: (metric: MetricId, day?: number) => void;
	/** Laid out in a narrow column, three tiles per row. */
	column?: boolean;
}

export const MetricCards = ({ dayIndex, onOpen, column = false }: MetricCardsProps) => {
	const context = useMetricContext();

	if (!context) return null;

	const source = dayIndex ?? null;
	const layout: MetricLayout = column ? 'column' : source === null ? 'row' : 'day';
	const precipitation = getPrecipitationMetric(context.weather, source);
	const metrics: MetricId[] =
		source === null
			? column
				? // Nine tiles fill three even rows, so clouds is left out.
					[precipitation, 'wind', 'uv', 'range', 'humidity', 'pressure', 'sunrise', 'sunset', 'moon']
				: [precipitation, 'wind', 'uv', 'range', 'humidity', 'pressure', 'sunrise', 'sunset', 'clouds', 'moon']
			: [precipitation, 'wind', 'uv', 'range'];

	return (
		<View className="-m-2 flex-row flex-wrap">
			{metrics.map((metric) => {
				const definition = metricDefinitions[metric];
				return (
					<MetricCard
						key={metric}
						definition={definition}
						title={context.t(definition.titleKey)}
						content={definition.card(context, source)}
						onPress={() => onOpen(metric, definition.usesDate ? (dayIndex ?? 0) : undefined)}
						layout={layout}
					/>
				);
			})}
		</View>
	);
};

const square = {};
const columnTiles = Array.from({ length: 9 }, () => square);
// Eight squares (UV third), then clouds and moon.
const rowTiles = [
	square,
	square,
	{ swapsAtLg: true },
	...Array.from({ length: 5 }, () => square),
	{ wide: true, tabletOnly: true, swapsAtLg: true },
	{ wide: true },
];

/** Mirrors the current conditions' grid, so the page does not jump when the data arrives. */
export const MetricCardsSkeleton = ({ column = false }: { column?: boolean }) => (
	<View className="-m-2 flex-row flex-wrap">
		{(column ? columnTiles : rowTiles).map((tile, index) => (
			<View
				key={index}
				// Without content to size them, the wide ones take the height of a row of squares.
				className={clsx(metricCellClassName(column ? 'column' : 'row', tile), 'wide' in tile && 'aspect-[2/1]')}
			>
				<Skeleton fill />
			</View>
		))}
	</View>
);
