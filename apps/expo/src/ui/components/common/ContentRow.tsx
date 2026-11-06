import type { ReactNode } from 'react';
import { View } from 'react-native';
import { RoundView } from './RoundView';
import { Text } from './Text';

interface ContentRowProps {
	title: string;
	children: ReactNode;
	className?: string;
}

export const ContentRow = ({ title, children, className }: ContentRowProps) => (
	<View className={className}>
		<Text type="sectiontitle" className="pb-2">
			{title}
		</Text>
		<RoundView className="p-4">{children}</RoundView>
	</View>
);
