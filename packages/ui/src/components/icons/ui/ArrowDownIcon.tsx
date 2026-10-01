import Svg, { Path } from 'react-native-svg';

export const ArrowDownIcon = () => {
	return (
		<Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
			<Path
				d="M9 17.65a1.15 1.15 0 001.15-1.15v-15a1.15 1.15 0 00-2.3 0v15c0 .635.515 1.15 1.15 1.15z"
				fill="#fff"
				stroke="#000"
				strokeWidth={0.3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M8.274 17.392a1.15 1.15 0 001.54-.078l3-3a1.15 1.15 0 00-1.627-1.627L9 14.874l-2.187-2.187a1.15 1.15 0 00-1.626 1.627l3.005 3.005.077.069.005.004z"
				fill="#fff"
				stroke="#000"
				strokeWidth={0.3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M8 13v2l1 .5 1-.5v-2H8z" fill="#fff" />
		</Svg>
	);
};
