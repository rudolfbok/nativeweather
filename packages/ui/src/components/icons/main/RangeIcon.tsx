import Svg, { Path } from 'react-native-svg';

export const RangeIcon = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M2.063 11.651a1 1 0 000 .696 10.75 10.75 0 0019.876 0 1 1 0 000-.696 10.75 10.75 0 00-19.876 0z"
				stroke="#39C1C7"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 15a3 3 0 100-6 3 3 0 000 6z"
				fill="#39C1C7"
				stroke="#39C1C7"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
