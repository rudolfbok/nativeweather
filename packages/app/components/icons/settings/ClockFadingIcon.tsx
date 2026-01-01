import Svg, { Path } from 'react-native-svg';

export const ClockFadingIcon = ({ stroke }: { stroke: string }) => {
	return (
		<Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 2a10 10 0 017.38 16.75M12 6v6l4 2M2.5 8.875a10 10 0 00-.5 3M2.828 16a10 10 0 002.43 3.4M4.633 5.232a10 10 0 01.89-.857M8.64 21.42a10 10 0 007.632-.38"
				stroke={stroke}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
