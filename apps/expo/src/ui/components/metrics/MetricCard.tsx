import { isTauri } from '@tauri-apps/api/core';
import { View } from 'react-native';
import { clsx } from 'clsx';
import { CardHeader } from '../common/CardHeader';
import { Pressable } from '../common/Pressable';
import { Text } from '../common/Text';
import type { MetricCardContent, MetricDefinition } from './types';

/** Where a grid of tiles sits: the city page's third column, its row under the forecasts, or a forecast day's four. */
export type MetricLayout = 'column' | 'row' | 'day';

// Every tile sits in a padded cell (the grid takes -m-2) and the cells split a row by exact percentages, so a wide tile
// is always two squares plus the gap between them; a gap with percentage widths can't do that, and native has no grid.
// The percentages stop just short of 100% so a row never wraps early; grow takes up the rest.
// A browser row fits six tiles from lg. The Tauri window keeps its content in a narrower column (desktopWidth) than the
// window the breakpoints measure, so it stays at four.
const cells = {
	column: 'basis-[33.333%]',
	day: 'basis-[50%] md:basis-[25%]',
	row: isTauri() ? 'basis-[50%] sm:basis-[25%]' : 'basis-[50%] sm:basis-[25%] lg:basis-[16.666%]',
	wide: isTauri() ? 'basis-full sm:basis-[50%]' : 'basis-full sm:basis-[50%] lg:basis-[33.333%]',
};

// On a row of its own a wide tile is as tall as its content and these gaps; beside squares (a browser row from lg) it
// takes their height, which its content only fits without them.
const wideGap = isTauri() ? 'gap-6' : 'gap-6 lg:gap-0';

/** A wide tile spans two cells of the row; every other tile, and every tile in the column, is square. */
export const metricCellClassName = (layout: MetricLayout, { wide = false, tabletOnly = false } = {}) =>
	clsx(
		'grow p-2',
		layout === 'row' && wide ? cells.wide : [cells[layout], 'aspect-square'],
		tabletOnly && 'hidden sm:flex'
	);

interface MetricCardProps {
	definition: MetricDefinition;
	title: string;
	content: MetricCardContent;
	onPress: () => void;
	layout: MetricLayout;
}

export const MetricCard = ({
	definition: { Icon, wide, tabletOnly },
	title,
	content,
	onPress,
	layout,
}: MetricCardProps) => (
	<View className={metricCellClassName(layout, { wide, tabletOnly })}>
		<Pressable
			onPress={onPress}
			className={clsx(
				'grow justify-between rounded-3xl border border-hairline p-4',
				layout === 'row' && wide && wideGap
			)}
		>
			<CardHeader icon={<Icon />} header={title} />
			{layout === 'column' && content.squareDescription ? (
				<Text type="body" numberOfLines={1}>
					{content.squareDescription}
				</Text>
			) : (
				<View className="min-w-0">
					{content.description && (
						<Text type="body" numberOfLines={1}>
							{content.description}
						</Text>
					)}
					{content.extra}
				</View>
			)}
			<Text type="data" className="w-full text-right" numberOfLines={1}>
				{content.value}
			</Text>
		</Pressable>
	</View>
);
