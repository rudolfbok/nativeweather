import Svg, { Path } from 'react-native-svg';

export const ClockIcon = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
				fill="#F2F2F7"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M12 6v6l4 2" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
		</Svg>
	);
};
