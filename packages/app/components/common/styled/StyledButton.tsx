import { clsx } from 'clsx';
import { GestureResponderEvent } from 'react-native';
import { StyledPressable } from './StyledPressable';
import { StyledText } from './StyledText';

interface StyledButtonProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	text: string;
}

export const StyledButton = ({ onPress, text }: StyledButtonProps) => {
	return (
		<StyledPressable
			onPress={onPress}
			className={clsx(
				'bg-systemBackground hover:bg-tertiarySystemBackground active:border-primaryblue dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark w-full select-none items-center rounded-3xl border border-transparent p-4 md:w-fit'
			)}
		>
			<StyledText type="body" className={clsx('!text-primaryblue text-center font-semibold')}>
				{text}
			</StyledText>
		</StyledPressable>
	);
};
