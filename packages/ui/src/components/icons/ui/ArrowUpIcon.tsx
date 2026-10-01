import Svg, { Path } from 'react-native-svg';

export const ArrowUpIcon = () => {
	return (
		<Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
			<Path
				d="M9 .25c.69 0 1.25.56 1.25 1.25v15a1.25 1.25 0 11-2.5 0v-15C7.75.81 8.31.25 9 .25z"
				fill="#fff"
				stroke="#000"
				strokeWidth={0.3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M8.306.46a1.25 1.25 0 011.578.156l3 3a1.25 1.25 0 01-1.768 1.768L9 3.268 6.884 5.384a1.25 1.25 0 01-1.768-1.768l3.01-3.01.076-.068.009-.008.095-.07z"
				fill="#fff"
				stroke="#000"
				strokeWidth={0.3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M8 5V3l1-.5 1 .5v2H8z" fill="#fff" />
		</Svg>
	);
};
