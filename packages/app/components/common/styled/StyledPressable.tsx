import { variants } from 'app/constants/pressableVariants';
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
			className={clsx(variants, className)}
		>
			{children}
		</Pressable>
	);
};
