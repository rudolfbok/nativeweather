import { clsx } from 'clsx';
import { View } from 'react-native';
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
		<View
			className={clsx(
				'bg-systemBackground dark:bg-secondarySystemBackground_dark flex overflow-hidden rounded-3xl p-4'
			)}
		>
			{children}
		</View>
	</View>
);
