import { clsx } from 'clsx';
import { GlassColorScheme } from 'expo-glass-effect';
import { GestureResponderEvent, Platform, Pressable } from 'react-native';

interface StyledPressableProps {
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
	onPressIn?: (event: GestureResponderEvent) => void | Promise<void>;
	className?: string;
	children: React.ReactNode;
	style?: any;
	tintColor?: string;
	colorScheme?: GlassColorScheme;
	liquidGlass?: any;
}

export const StyledPressable = ({ onPress, onPressIn, className, children, tintColor }: StyledPressableProps) => {
	return (
		<Pressable
			onPress={onPress}
			onPressIn={onPressIn}
			style={Platform.OS === 'web' && tintColor ? { backgroundColor: tintColor } : undefined}
			className={clsx(
				'bg-systemBackground hover:bg-tertiarySystemBackground active:native:bg-tertiarySystemBackground',
				'dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark dark:active:native:bg-tertiarySystemBackground_dark',
				className
			)}
		>
			{children}
		</Pressable>
	);
};
