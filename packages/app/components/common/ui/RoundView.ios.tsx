import clsx from 'clsx';
import { GlassView } from 'expo-glass-effect';
import React from 'react';
import { View } from 'react-native';

interface RoundViewProps {
	children: React.ReactNode;
	style?: any;
	className?: string;
	colorScheme?: any;
	liquidGlass?: boolean;
	glassEffectStyle?: any;
}

export const RoundView = ({
	liquidGlass = false,
	glassEffectStyle,
	colorScheme,
	style,
	className,
	children,
}: RoundViewProps) => {
	if (liquidGlass) {
		return (
			<GlassView
				style={{ borderRadius: 24, overflow: 'hidden', ...style }}
				colorScheme={colorScheme}
				glassEffectStyle={glassEffectStyle}
			>
				{children}
			</GlassView>
		);
	} else {
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
	}
};
