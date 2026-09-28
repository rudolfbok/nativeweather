import { clsx } from 'clsx';
import { View } from 'react-native';
import { StyledText } from '../styled/StyledText';

interface CardHeaderProps {
	header: string;
	icon?: React.ReactNode;
	underline?: boolean;
	className?: string;
}

export const CardHeader = ({ header, icon, underline, className }: CardHeaderProps) => {
	return (
		<View className={clsx('w-full min-w-0 flex-row items-center gap-2', className)}>
			{icon}
			<StyledText
				type="title"
				className={clsx('min-w-0 flex-1 line-clamp-1 truncate', underline && 'web:hover:underline')}
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{header}
			</StyledText>
		</View>
	);
};
