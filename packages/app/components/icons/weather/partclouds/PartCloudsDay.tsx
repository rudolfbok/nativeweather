import Svg, { Path, SvgProps } from 'react-native-svg';

export const PartCloudsDay = ({ strokeWidth, ...props }: { strokeWidth: number } & SvgProps) => {
	return (
		<Svg viewBox="0 0 40 40" fill="none" vectorEffect="none" {...props}>
			<Path
				d="M25 19a4 4 0 100-8 4 4 0 000 8z"
				fill="#FFC002"
				stroke="#FFC002"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M25 5v2z" fill="#FFC002" />
			<Path d="M25 5v2" stroke="#FFC002" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M25 23v2-2z" fill="#FFC002" />
			<Path d="M25 23v2" stroke="#FFC002" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M17.93 7.93l1.41 1.41z" fill="#FFC002" />
			<Path d="M17.93 7.93l1.41 1.41" stroke="#FFC002" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M30.656 20.656l1.41 1.41-1.41-1.41z" fill="#FFC002" />
			<Path
				d="M30.656 20.656l1.41 1.41"
				stroke="#FFC002"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M15 15h2-2z" fill="#FFC002" />
			<Path d="M15 15h2" stroke="#FFC002" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M33 15h2z" fill="#FFC002" />
			<Path d="M33 15h2" stroke="#FFC002" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M19.34 20.656l-1.41 1.41 1.41-1.41z" fill="#FFC002" />
			<Path
				d="M19.34 20.656l-1.41 1.41"
				stroke="#FFC002"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M32.066 7.93l-1.41 1.41z" fill="#FFC002" />
			<Path d="M32.066 7.93l-1.41 1.41" stroke="#FFC002" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<Path
				d="M26.924 29H15.448c-1.752 0-3.47-.49-4.962-1.416a9.482 9.482 0 01-3.483-3.825 9.542 9.542 0 01.871-9.937 9.457 9.457 0 014.095-3.154 9.405 9.405 0 019.772 1.742 9.506 9.506 0 012.767 4.376h2.416a6.06 6.06 0 014.297 1.788A6.123 6.123 0 0133 22.893c0 1.62-.64 3.173-1.78 4.318A6.06 6.06 0 0126.925 29z"
				fill="#fff"
				stroke="#000"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
