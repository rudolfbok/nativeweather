import { clsx } from 'clsx';
import { ActivityIndicator, GestureResponderEvent } from 'react-native';
import { StyledPressable } from './StyledPressable';
import { StyledText } from './StyledText';

interface StyledButtonProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	children: string;
	className?: string;
	loading?: boolean;
}

export const StyledButton = ({ onPress, className, children, loading }: StyledButtonProps) => {
	return (
		<StyledPressable
			onPress={onPress}
			className={clsx(
				'bg-systemBackground hover:bg-tertiarySystemBackground dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark w-full select-none flex-row items-center justify-center rounded-3xl p-4 md:w-fit',
				className
			)}
		>
			{loading && <ActivityIndicator size="small" className={clsx('mr-2')} />}
			<StyledText type="body" className={clsx('text-center font-semibold')}>
				{children}
			</StyledText>
		</StyledPressable>
	);
};
