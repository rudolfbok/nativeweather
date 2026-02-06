import { clsx } from 'clsx';
import { GestureResponderEvent } from 'react-native';
import { StyledPressable } from './StyledPressable';
import { StyledText } from './StyledText';

interface StyledButtonProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	children: string;
	className?: string;
}

export const StyledButton = ({ onPress, children, className }: StyledButtonProps) => {
	return (
		<StyledPressable
			onPress={onPress}
			className={clsx(
				'bg-systemBackground hover:bg-tertiarySystemBackground dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark w-full select-none items-center rounded-3xl p-4 md:w-fit',
				className
			)}
		>
			<StyledText type="body" className={clsx('text-center font-semibold')}>
				{children}
			</StyledText>
		</StyledPressable>
	);
};
