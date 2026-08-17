import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export const ThermometerIcon = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M8.5 19.5L8 18l1.5-3.5.5-.5V3l2-1 2 1v11l.5.5 2 3.5-.5 1.5-1 1.5-2 1h-2l-1.5-1-1-1.5z"
				fill="url(#paint0_linear_699_115)"
				stroke="url(#paint1_linear_699_115)"
				strokeWidth={0.5}
			/>
			<Path
				d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 114 0z"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Defs>
				<LinearGradient id="paint0_linear_699_115" x1={12.25} y1={2} x2={12.25} y2={22} gradientUnits="userSpaceOnUse">
					<Stop stopColor="#FF3100" />
					<Stop offset={0.777889} stopColor="#DCFF00" />
				</LinearGradient>
				<LinearGradient id="paint1_linear_699_115" x1={12.25} y1={2} x2={12.25} y2={22} gradientUnits="userSpaceOnUse">
					<Stop stopColor="red" />
					<Stop offset={1} stopColor="#666" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
};
