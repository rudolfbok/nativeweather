import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

type LegendGradientProps = {
	colors: readonly [string, string, ...string[]];
	locations: readonly [number, number, ...number[]];
	children: ReactNode;
};

export const LegendGradient = ({ colors, locations, children }: LegendGradientProps) => (
	<View style={{ flex: 1 }}>
		<Svg pointerEvents="none" width="100%" height="100%" style={StyleSheet.absoluteFill}>
			<Defs>
				<LinearGradient id="map-legend-gradient" x1="0" y1="0" x2="1" y2="0">
					{colors.map((color, index) => (
						<Stop key={`${color}-${index}`} offset={locations[index] ?? 0} stopColor={color} />
					))}
				</LinearGradient>
			</Defs>
			<Rect width="100%" height="100%" fill="url(#map-legend-gradient)" />
		</Svg>
		{children}
	</View>
);
