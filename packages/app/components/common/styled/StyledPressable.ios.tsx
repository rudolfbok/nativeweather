import { GlassColorScheme, GlassStyle, GlassView } from 'expo-glass-effect';
import { GestureResponderEvent, Pressable } from 'react-native';

interface StyledPressableProps {
	style?: any;
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
	tintColor?: string;
	children: React.ReactNode;
	className?: string;
	glassEffectStyle?: GlassStyle;
	colorScheme?: GlassColorScheme;
}

export const StyledPressable = ({
	colorScheme,
	glassEffectStyle,
	tintColor,
	style,
	onPress,
	children,
}: StyledPressableProps) => {
	return (
		<Pressable onPress={onPress}>
			<GlassView
				style={{ borderRadius: 24, ...style }}
				isInteractive={true}
				tintColor={tintColor}
				glassEffectStyle={glassEffectStyle}
				colorScheme={colorScheme}
			>
				{children}
			</GlassView>
		</Pressable>
	);
};
