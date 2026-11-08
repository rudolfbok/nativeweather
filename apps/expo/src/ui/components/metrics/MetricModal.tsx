import type { ReactNode } from 'react';
import { View } from 'react-native';
import { ContentRow } from '../common/ContentRow';
import { Text } from '../common/Text';
import { ValuesList } from '../common/ValuesList';
import type { ValueItem } from '../common/ValuesList';

type MetricSection = { title: string; className?: string } & (
	{ text: string } | { values: ValueItem[]; showIndex?: boolean; valueClassName?: string } | { content: ReactNode }
);

/** Modal body shared by every metric: an optional chart, then titled sections. */
export const MetricModal = ({ chart, sections }: { chart?: ReactNode; sections: (MetricSection | false)[] }) => (
	<View className="gap-4">
		{chart}
		{sections.map(
			(section) =>
				section && (
					<ContentRow key={section.title} title={section.title} className={section.className}>
						{'text' in section ? (
							<Text type="body">{section.text}</Text>
						) : 'values' in section ? (
							<ValuesList
								values={section.values}
								showIndex={section.showIndex}
								valueClassName={section.valueClassName}
							/>
						) : (
							section.content
						)}
					</ContentRow>
				)
		)}
	</View>
);
