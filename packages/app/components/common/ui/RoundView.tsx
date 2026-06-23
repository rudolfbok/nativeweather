import { clsx } from 'clsx';
import { GlassColorScheme, GlassEffectStyleConfig, GlassStyle, GlassView, GlassViewProps } from 'expo-glass-effect';
import React from 'react';
import { Platform, StyleProp, TextStyle, View } from 'react-native';

interface RoundViewProps {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
	className?: string;
	colorScheme?: GlassColorScheme;
	liquidGlass?: boolean;
	glassEffectStyle?: GlassStyle;
}

export const RoundView = ({
	liquidGlass = false,
	glassEffectStyle,
	colorScheme,
	style,
	className,
	children,
}: RoundViewProps) => {
	if (Platform.OS === 'ios' && liquidGlass) {
		return (
			<GlassView
				style={{ borderRadius: 24, overflow: 'hidden', ...style }}
				colorScheme={colorScheme}
				glassEffectStyle={glassEffectStyle}
			>
				{children}
			</GlassView>
		);
	}

	return (
		<View
			className={clsx(
				'bg-systemBackground dark:bg-secondarySystemBackground_dark flex overflow-hidden rounded-3xl',
				className
			)}
		>
			{children}
		</View>
	);
};
