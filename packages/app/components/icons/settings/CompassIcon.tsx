import Svg, { Path } from 'react-native-svg';

export const CompassIcon = () => {
	return (
		<Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
				fill="#fff"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M16.238 7.758l-1.804 5.41a2 2 0 01-1.265 1.266l-5.411 1.804 1.804-5.411a2 2 0 011.265-1.265l5.41-1.804z"
				stroke="red"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
