import { clsx } from 'clsx';
import { View } from 'react-native';
import { StyledText } from '../styled/StyledText';
import { border } from '@nativeweather/ui/constants/border';

interface ContentRowProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

export const ContentRow = ({ title, children, className }: ContentRowProps) => (
	<View className={clsx(className)}>
		<StyledText type="sectiontitle" className={clsx('pb-2')}>
			{title}
		</StyledText>
		<View
			className={clsx(
				'flex overflow-hidden rounded-3xl bg-systemBackground p-4 dark:bg-secondarySystemBackground_dark',
				border
			)}
		>
			{children}
		</View>
	</View>
);
