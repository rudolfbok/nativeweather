import Svg from 'react-native-svg';
import type { ReactNode } from 'react';

interface LandscapeWrapperProps {
	width?: number;
	height?: number;
	children: ReactNode;
}

export const LandscapeWrapper = ({ width = 600, height = 710, children }: LandscapeWrapperProps) => (
	<Svg width={width} height={height} viewBox="0 0 600 710" preserveAspectRatio="none" fill="none">
		{children}
	</Svg>
);
