import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const TilePositron = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M3.5 7L2 10v1h3l2 1v1.5l.5 1.5L9 16l2 1v4.5h4V16l1-1h5.5l.5-2v-2l-.5-3H17l-2 4h-2l-1-2-1-2H9L7 6.5V3l-.5.5L5 5 3.5 7z"
				fill="#C1C1C1"
				stroke="#000"
			/>
			<Path d="M7 6V4l2-1 2.5-.5H14l2 1L18 5l1 1 1 1v1h-3l-1 1v2l-1 1h-1.5l-1-1-.5-2-1-1H9L8 7 7 6z" fill="#fff" />
			<Path
				d="M7 3.344v1.66a3 3 0 003 3 2 2 0 012 2c0 1.1.9 2 2 2a2 2 0 002-2c0-1.1.9-2 2-2h3.17"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M5 11H2v3.5L3 17l2 2 2 1.5L9 22h2v-4l-1-2H8l-1-1v-3l-1-1H5z" fill="#fff" stroke="#000" />
			<Path
				d="M10.997 21.95V18a2 2 0 00-2-2 2 2 0 01-2-2v-1a2 2 0 00-2-2h-2.95"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M15 16v5h2l4-4v-2h-5l-1 1z" fill="#fff" stroke="#000" />
			<Path
				d="M21.54 15H17a2 2 0 00-2 2v4.54"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
