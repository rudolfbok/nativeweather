import { useThemeColors } from 'app/hooks/useThemeColors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const AlertIcon = ({ mostSevere }: { mostSevere: string }) => {
	const { text } = useThemeColors();

	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M3.853 8.623a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 3.999 3.999 0 01-4.77 4.78 3.999 3.999 0 01-6.75 0 3.999 3.999 0 01-4.78-4.77 4 4 0 010-6.76z"
				fill={mostSevere}
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 8v4M12 16h.01"
				stroke={mostSevere === 'alert' ? 'red' : 'green'}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
