import { clsx } from 'clsx';
import { GlassColorScheme, GlassStyle, GlassView } from 'expo-glass-effect';
import React from 'react';
import { Platform, View } from 'react-native';
import tw from 'twrnc';

interface RoundViewProps {
	children: React.ReactNode;
	className?: string;
	colorScheme?: GlassColorScheme;
	liquidGlass?: boolean;
	glassEffectStyle?: GlassStyle;
}

export const RoundView = ({
	liquidGlass = false,
	glassEffectStyle,
	colorScheme,
	className,
	children,
}: RoundViewProps) => {
	if (Platform.OS === 'ios' && liquidGlass) {
		return (
			<GlassView
				style={tw`rounded-3xl overflow-hidden ${className}`}
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
