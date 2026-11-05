import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

export const LightRainNight = (props: SvgProps) => {
	return (
		<Svg viewBox="0 0 40 40" fill="none" vectorEffect="none" {...props}>
			<Path d="M27 5.5a5.303 5.303 0 107.5 7.5A7.5 7.5 0 1127 5.5z" fill="#5F0261" />
			<Path
				d="M26.924 29H15.448c-1.752 0-3.47-.49-4.962-1.416a9.482 9.482 0 01-3.483-3.825 9.542 9.542 0 01.871-9.937 9.457 9.457 0 014.095-3.154 9.405 9.405 0 019.772 1.742 9.506 9.506 0 012.767 4.376h2.416a6.06 6.06 0 014.297 1.788A6.123 6.123 0 0133 22.893c0 1.62-.64 3.173-1.78 4.318A6.06 6.06 0 0126.925 29z"
				fill="#B1B1B1"
				stroke="#B1B1B1"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Rect x={14} y={26} width={2} height={8} rx={1} fill="#2793FF" />
			<Rect x={22} y={26} width={2} height={8} rx={1} fill="#2793FF" />
			<Rect x={18} y={28} width={2} height={8} rx={1} fill="#2793FF" />
		</Svg>
	);
};
