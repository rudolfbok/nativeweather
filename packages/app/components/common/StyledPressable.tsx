import clsx from 'clsx';
import { GestureResponderEvent, Pressable } from 'react-native';

interface StyledPressableProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	className: string;
	children: React.ReactNode;
}

export const StyledPressable = ({ onPress, className, children }: StyledPressableProps) => {
	return (
		<Pressable
			onPress={onPress}
			className={clsx(
				'bg-systemBackground hover:bg-tertiarySystemBackground active:ios:bg-tertiarySystemBackground',
				'dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark dark:active:ios:bg-tertiarySystemBackground_dark',
				className
			)}
		>
			{children}
		</Pressable>
	);
};
