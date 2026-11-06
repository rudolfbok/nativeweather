import Svg, { Path, SvgProps } from 'react-native-svg';

export const FogNight = (props: SvgProps) => {
	return (
		<Svg viewBox="0 0 40 40" fill="none" vectorEffect="none" {...props}>
			<Path
				d="M25 22H10M26.677 27H13.344M15 17h15M13.323 12h13.333"
				stroke="#979797"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M26.5 4.875a3.978 3.978 0 005.625 5.625A5.625 5.625 0 1126.5 4.875z" fill="#5F0261" />
		</Svg>
	);
};
