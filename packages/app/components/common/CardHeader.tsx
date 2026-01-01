import { clsx } from 'clsx';
import { View } from 'react-native';
import { StyledText } from './StyledText';

interface CardHeaderProps {
	header: string;
	icon: React.ReactNode;
	underline?: boolean;
	className?: string;
}

export const CardHeader = ({ header, icon, underline, className }: CardHeaderProps) => {
	return (
		<View className={clsx('flex-row items-center gap-2', className)}>
			{icon}
			<StyledText type="title" className={clsx('line-clamp-1 truncate', underline && 'web:hover:underline')}>
				{header}
			</StyledText>
		</View>
	);
};
