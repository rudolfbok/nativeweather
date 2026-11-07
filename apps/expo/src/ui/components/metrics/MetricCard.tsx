import { View } from 'react-native';
import { clsx } from 'clsx';
import { CardHeader } from '../common/CardHeader';
import { Pressable } from '../common/Pressable';
import { Text } from '../common/Text';
import type { MetricCardContent, MetricDefinition } from './types';

interface MetricCardProps {
	definition: MetricDefinition;
	title: string;
	content: MetricCardContent;
	onPress: () => void;
	/** Three square tiles per row for a narrow column. */
	column?: boolean;
}

export const MetricCard = ({
	definition: { Icon, wide, tabletOnly },
	title,
	content,
	onPress,
	column,
}: MetricCardProps) => (
	<Pressable
		onPress={onPress}
		className={clsx(
			'grow justify-between rounded-3xl border border-hairline p-4',
			column
				? 'aspect-square basis-[30%]'
				: wide
					? 'basis-full gap-6 md:basis-[40%]'
					: 'aspect-square basis-[40%] md:basis-[20%]',
			tabletOnly && 'hidden md:flex'
		)}
	>
		<CardHeader icon={<Icon />} header={title} />
		{column && content.squareDescription ? (
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
);
