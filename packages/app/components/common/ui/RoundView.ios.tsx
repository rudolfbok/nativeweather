import { GlassView } from 'expo-glass-effect';
import React from 'react';

interface RoundViewProps {
	children: React.ReactNode;
	style?: any;
	className?: string;
	colorScheme?: any;
}

export const RoundView = ({ colorScheme, style, children }: RoundViewProps) => {
	return (
		<GlassView style={{ borderRadius: 24, overflow: 'hidden', ...style }} colorScheme={colorScheme}>
			{children}
		</GlassView>
	);
};
