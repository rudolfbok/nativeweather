import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import { StyledPressable } from './StyledPressable';
import { StyledText } from './StyledText';

interface StyledButtonProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	icon?: ReactNode;
	className?: string;
	text: string;
}

export const StyledButton = ({ onPress, icon, className, text }: StyledButtonProps) => {
	return (
		<StyledPressable
			onPress={onPress}
			className={clsx(
				'bg-systemBackground hover:bg-tertiarySystemBackground dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark select-none flex-row items-center justify-center gap-2 rounded-3xl p-3',
				className
			)}
		>
			<StyledText type="subtitle" className={clsx('text-center')}>
				{text}
			</StyledText>
			{icon}
		</StyledPressable>
	);
};
