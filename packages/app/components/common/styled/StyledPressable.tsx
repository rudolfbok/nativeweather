import { clsx } from 'clsx';
import { GlassColorScheme, GlassStyle } from 'expo-glass-effect';
import { GestureResponderEvent, Pressable } from 'react-native';

interface StyledPressableProps {
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
	className?: string;
	children: React.ReactNode;
	style?: any;
	tintColor?: string;
	glassEffectStyle?: GlassStyle;
	colorScheme?: GlassColorScheme;
}

export const StyledPressable = ({ onPress, className, children }: StyledPressableProps) => {
	return (
		<Pressable
			onPress={onPress}
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
