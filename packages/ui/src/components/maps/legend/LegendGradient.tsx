import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';

type LegendGradientProps = {
	colors: readonly [string, string, ...string[]];
	locations: readonly [number, number, ...number[]];
	children: ReactNode;
};

export const LegendGradient = ({ colors, locations, children }: LegendGradientProps) => {
	return (
		<LinearGradient
			colors={colors}
			locations={locations}
			style={{ flex: 1 }}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
		>
			{children}
		</LinearGradient>
	);
};
