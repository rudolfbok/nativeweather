import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import { StyledPressable } from './StyledPressable';
import { StyledText } from './StyledText';
import { variants } from 'app/constants/pressableVariants';
import { border } from 'app/constants/border';

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
				'w-full select-none flex-row items-center justify-center gap-2 rounded-3xl p-4 lg:w-fit lg:px-6',
				border,
				className
			)}
		>
			<StyledText type="body" className={clsx('text-center font-semibold')}>
				{text}
			</StyledText>
			{icon}
		</StyledPressable>
	);
};
