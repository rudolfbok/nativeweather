import { isTauri } from '@tauri-apps/api/core';
import { Platform, View } from 'react-native';
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
const browser = Platform.OS === 'web' && !isTauri();
const cells = {
	column: 'basis-[33.333%]',
	day: 'basis-[50%] md:basis-[25%]',
	row: browser ? 'basis-[50%] sm:basis-[25%] lg:basis-[16.666%]' : 'basis-[50%] sm:basis-[25%]',
	wide: browser ? 'basis-full sm:basis-[50%] lg:basis-[33.333%]' : 'basis-full sm:basis-[50%]',
	// A browser row from lg swaps shapes: a square that widens there stretches to the squares' height.
	widensAtLg: 'basis-[50%] sm:basis-[25%] lg:basis-[33.333%] aspect-square lg:aspect-auto',
	narrowsAtLg: 'basis-full sm:basis-[50%] lg:basis-[16.666%]',
};

// On a row of its own a wide tile is as tall as its content and these gaps; beside squares (a browser row from lg) it
// takes their height, which its content only fits without them.
const wideGap = browser ? 'gap-6 lg:gap-0' : 'gap-6';

const rowCell = (wide: boolean, swapsAtLg: boolean) => {
	if (browser && swapsAtLg) return wide ? cells.narrowsAtLg : cells.widensAtLg;
	return wide ? cells.wide : [cells.row, 'aspect-square'];
};

/** A wide tile spans two cells of the row; every other tile, and every tile in the column, is square. */
export const metricCellClassName = (
	layout: MetricLayout,
	{ wide = false, tabletOnly = false, swapsAtLg = false } = {}
) =>
	clsx(
		'grow p-2',
		layout === 'row' ? rowCell(wide, swapsAtLg) : [cells[layout], 'aspect-square'],
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
	definition: { Icon, wide, tabletOnly, swapsAtLg },
	title,
	content,
	onPress,
	layout,
}: MetricCardProps) => (
	<View className={metricCellClassName(layout, { wide, tabletOnly, swapsAtLg })}>
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
