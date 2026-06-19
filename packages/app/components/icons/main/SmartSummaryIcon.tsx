import Svg, { Path } from 'react-native-svg';

export const SmartSummaryIcon = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M18 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z"
				stroke="#000"
				fill="#F2F2F7"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M8 10h6M8 14h8M8 18h5" stroke="#007AFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M8 2v4M12 2v4M16 2v4" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
		</Svg>
	);
};
