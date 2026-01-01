import { clsx } from 'clsx';
import { ActivityIndicator } from 'react-native';
import { RoundView } from './RoundView';
import { StyledText } from './StyledText';

interface LoadingIndicatorProps {
	className?: string;
	text: string;
}

export const LoadingIndicator = ({ className, text }: LoadingIndicatorProps) => {
	return (
		<RoundView
			className={clsx('w-full flex-row items-center justify-center gap-2 place-self-center p-4 md:w-fit', className)}
		>
			<ActivityIndicator size={22} color="#007AFF" />
			<StyledText type="body" className={clsx('text-secondaryLabel dark:text-secondaryLabel_dark')}>
				{text}
			</StyledText>
		</RoundView>
	);
};
