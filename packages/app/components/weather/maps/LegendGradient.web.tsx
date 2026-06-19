import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';

type LegendGradientProps = {
	colors: readonly [string, string, ...string[]];
	locations: readonly [number, number, ...number[]];
	children: ReactNode;
};

type WebGradientStyle = ViewStyle & {
	backgroundImage: string;
	backgroundSize: string;
};

const getGradient = (colors: readonly string[], locations: readonly number[]) => {
	return `linear-gradient(90deg, ${colors.map((color, index) => `${color} ${(locations[index] ?? 0) * 100}%`).join(', ')})`;
};

export const LegendGradient = ({ colors, locations, children }: LegendGradientProps) => {
	const style: WebGradientStyle = {
		flex: 1,
		backgroundImage: getGradient(colors, locations),
		backgroundSize: '100% 100%',
	};

	return <View style={style}>{children}</View>;
};
