import { clsx } from 'clsx';
import { View } from 'react-native';
import { RoundView } from './RoundView';
import { StyledText } from '../styled/StyledText';

interface ContentRowProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

export const ContentRow = ({ title, children, className }: ContentRowProps) => (
	<View className={className}>
		<StyledText type="subtitle" className={clsx('pb-2')}>
			{title}
		</StyledText>
		<RoundView className="p-4">{children}</RoundView>
	</View>
);
