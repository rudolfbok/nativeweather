import { variants } from 'app/constants/pressableVariants';
import { clsx } from 'clsx';
import { GlassColorScheme, GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { cssInterop } from 'nativewind';
import { AccessibilityRole, AccessibilityState, GestureResponderEvent, Platform, Pressable } from 'react-native';

const StyledGlassView = cssInterop(GlassView, { className: 'style' });

interface StyledPressableProps {
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
	onPressIn?: (event: GestureResponderEvent) => void | Promise<void>;
	tintColor?: string;
	children: React.ReactNode;
	className?: string;
	colorScheme?: GlassColorScheme;
	liquidGlass?: boolean;
	accessibilityLabel?: string;
	accessibilityRole?: AccessibilityRole;
	accessibilityState?: AccessibilityState;
}

export const StyledPressable = ({
	colorScheme,
	tintColor,
	className,
	onPress,
	onPressIn,
	children,
	liquidGlass = false,
	accessibilityLabel,
	accessibilityRole,
	accessibilityState,
}: StyledPressableProps) => {
	if (Platform.OS === 'ios' && liquidGlass && isLiquidGlassAvailable() && isGlassEffectAPIAvailable()) {
		return (
			<Pressable
				onPress={onPress}
				accessibilityLabel={accessibilityLabel}
				accessibilityRole={accessibilityRole}
				accessibilityState={accessibilityState}
			>
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
			style={[tintColor ? { backgroundColor: tintColor } : undefined, { cursor: 'pointer' }]}
			className={clsx(variants, className)}
			accessibilityLabel={accessibilityLabel}
			accessibilityRole={accessibilityRole}
			accessibilityState={accessibilityState}
		>
			{children}
		</Pressable>
	);
};
