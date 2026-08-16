import { variants } from 'app/constants/pressableVariants';
import { clsx } from 'clsx';
import { GlassColorScheme, GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { cssInterop } from 'nativewind';
import { GestureResponderEvent, Platform, Pressable } from 'react-native';

const StyledGlassView = cssInterop(GlassView, { className: 'style' });

interface StyledPressableProps {
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
	className,
	onPress,
	onPressIn,
	children,
	liquidGlass = false,
}: StyledPressableProps) => {
	if (Platform.OS === 'ios' && liquidGlass && isLiquidGlassAvailable() && isGlassEffectAPIAvailable()) {
		return (
			<Pressable onPress={onPress}>
				<StyledGlassView className={className} isInteractive={true} tintColor={tintColor} colorScheme={colorScheme}>
					{children}
				</StyledGlassView>
			</Pressable>
		);
	}

	return (
		<Pressable
			onPress={onPress}
			onPressIn={onPressIn}
			style={tintColor ? { backgroundColor: tintColor } : undefined}
			className={clsx(variants, className)}
		>
			{children}
		</Pressable>
	);
};
