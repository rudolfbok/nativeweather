import { clsx } from 'clsx';
import { GlassColorScheme, GlassView } from 'expo-glass-effect';
import { GestureResponderEvent, Platform, Pressable, StyleProp, ViewStyle } from 'react-native';

interface StyledPressableProps {
	style?: StyleProp<ViewStyle>;
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
	onPressIn?: (event: GestureResponderEvent) => void | Promise<void>;
	tintColor?: string;
	children: React.ReactNode;
	className?: string;
	colorScheme?: GlassColorScheme;
	liquidGlass?: boolean;
}

export const StyledPressable = ({
	colorScheme,
	tintColor,
	style,
	className,
	onPress,
	onPressIn,
	children,
	liquidGlass = false,
}: StyledPressableProps) => {
	if (liquidGlass && Platform.OS === 'ios') {
		return (
			<Pressable onPress={onPress}>
				<GlassView
					style={{ borderRadius: 24, ...style }}
					isInteractive={true}
					tintColor={tintColor}
					colorScheme={colorScheme}
				>
					{children}
				</GlassView>
			</Pressable>
		);
	}

	return (
		<Pressable
			onPress={onPress}
			onPressIn={onPressIn}
			style={{ backgroundColor: tintColor }}
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
