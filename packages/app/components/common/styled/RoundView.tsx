import { border } from 'app/constants/border';
import { clsx } from 'clsx';
import {
	GlassColorScheme,
	GlassStyle,
	GlassView,
	isGlassEffectAPIAvailable,
	isLiquidGlassAvailable,
} from 'expo-glass-effect';
import { cssInterop } from 'nativewind';
import React from 'react';
import { Platform, View } from 'react-native';

const StyledGlassView = cssInterop(GlassView, { className: 'style' });

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
	if (Platform.OS === 'ios' && liquidGlass && isLiquidGlassAvailable() && isGlassEffectAPIAvailable()) {
		return (
			<StyledGlassView
				className={clsx('overflow-hidden rounded-3xl', className)}
				colorScheme={colorScheme}
				glassEffectStyle={glassEffectStyle}
			>
				{children}
			</StyledGlassView>
		);
	}

	return (
		<View
			className={clsx(
				'bg-systemBackground dark:bg-secondarySystemBackground_dark flex overflow-hidden rounded-3xl',
				border,
				className
			)}
		>
			{children}
		</View>
	);
};
