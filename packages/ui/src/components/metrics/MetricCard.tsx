import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { CardHeader } from '../common/CardHeader';
import { Pressable } from '../common/Pressable';
import { Text } from '../common/Text';
import type { MetricCardContent, MetricDefinition } from './types';

interface MetricCardProps {
	definition: MetricDefinition;
	title: string;
	content: MetricCardContent;
	onPress: () => void;
}

export const MetricCard = ({ definition: { Icon, wide, tabletOnly }, title, content, onPress }: MetricCardProps) => (
	<Pressable
		onPress={onPress}
		className={twMerge(
			'grow justify-between rounded-3xl border border-hairline p-4',
			wide ? 'basis-full gap-6 md:basis-[40%]' : 'aspect-square basis-[40%] md:basis-[20%]',
			tabletOnly && 'hidden md:flex'
		)}
	>
		<CardHeader icon={<Icon />} header={title} />
		<View className="min-w-0">
			{content.description && (
				<Text type="body" numberOfLines={1}>
					{content.description}
				</Text>
			)}
			{content.extra}
		</View>
		<Text type="data" className="w-full text-right" numberOfLines={1}>
			{content.value}
		</Text>
	</Pressable>
);
