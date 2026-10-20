import { clsx } from 'clsx';
import { GestureResponderEvent, Pressable } from 'react-native';

interface StyledPressableProps {
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
	onPressIn?: (event: GestureResponderEvent) => void | Promise<void>;
	tintColor?: string;
	children: React.ReactNode;
	className?: string;
}

export const StyledPressable = ({ tintColor, className, onPress, onPressIn, children }: StyledPressableProps) => {
	return (
		<Pressable
			onPress={onPress}
			onPressIn={onPressIn}
			style={[tintColor ? { backgroundColor: tintColor } : undefined, { cursor: 'pointer' }]}
			className={clsx(
				'bg-systemBackground dark:bg-secondarySystemBackground_dark',
				'web:mouse-hover:bg-tertiarySystemBackground web:dark:mouse-hover:bg-tertiarySystemBackground_dark',
				'web:active:bg-tertiarySystemBackground web:active:dark:bg-tertiarySystemBackground_dark',
				'macos:hover:bg-tertiarySystemBackground macos:dark:hover:bg-tertiarySystemBackground_dark',
				'ios:active:bg-tertiarySystemBackground ios:active:dark:bg-tertiarySystemBackground_dark',
				'android:active:bg-tertiarySystemBackground android:active:dark:bg-tertiarySystemBackground_dark',
				className
			)}
		>
			{children}
		</Pressable>
	);
};
