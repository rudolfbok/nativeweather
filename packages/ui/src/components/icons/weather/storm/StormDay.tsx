import Svg, { Path, SvgProps } from 'react-native-svg';

export const StormDay = ({ strokeWidth, ...props }: { strokeWidth: number } & SvgProps) => {
	return (
		<Svg viewBox="0 0 40 40" fill="none" vectorEffect="none" {...props}>
			<Path
				d="M29.924 24H18.448c-1.752 0-3.47-.49-4.962-1.416a9.483 9.483 0 01-3.483-3.825 9.543 9.543 0 01.871-9.937 9.457 9.457 0 014.095-3.154A9.405 9.405 0 0124.74 7.41a9.506 9.506 0 012.767 4.376h2.416a6.06 6.06 0 014.297 1.789A6.123 6.123 0 0136 17.892c0 1.62-.64 3.173-1.78 4.318A6.06 6.06 0 0129.925 24z"
				fill="#C7C7C7"
				stroke="#C7C7C7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M25.924 29H14.448c-1.752 0-3.47-.49-4.962-1.416a9.482 9.482 0 01-3.483-3.825 9.542 9.542 0 01.871-9.937 9.457 9.457 0 014.095-3.154 9.405 9.405 0 019.772 1.742 9.506 9.506 0 012.767 4.376h2.416a6.06 6.06 0 014.297 1.788A6.123 6.123 0 0132 22.893c0 1.62-.64 3.173-1.78 4.318A6.06 6.06 0 0125.925 29z"
				fill="#fff"
				stroke="#000"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M19.75 23L16 29.5h5L17.25 36"
				stroke="#F2CF4B"
				strokeWidth={3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
