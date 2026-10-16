import { clsx } from 'clsx';
import { GestureResponderEvent } from 'react-native';
import { StyledPressable } from './StyledPressable';
import { StyledText } from './StyledText';

interface StyledButtonProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	className?: string;
	text: string;
}

export const StyledButton = ({ onPress, className, text }: StyledButtonProps) => {
	return (
		<StyledPressable
			onPress={onPress}
			className={clsx(
				'w-full select-none flex-row items-center justify-center gap-2 rounded-3xl !bg-primaryblue p-4 lg:px-6',
				className
			)}
		>
			<StyledText type="body" className={clsx('text-center font-semibold text-white')}>
				{text}
			</StyledText>
		</StyledPressable>
	);
};
