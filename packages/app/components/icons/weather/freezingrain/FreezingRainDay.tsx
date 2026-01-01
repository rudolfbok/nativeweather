import Svg, { Path, Rect, G, Defs, ClipPath, SvgProps } from 'react-native-svg';

export const FreezingRainDay = ({ strokeWidth, ...props }: { strokeWidth: number } & SvgProps) => {
	return (
		<Svg viewBox="0 0 40 40" fill="none" vectorEffect="none" {...props}>
			<Path
				d="M26.924 29H15.448c-1.752 0-3.47-.49-4.962-1.416a9.482 9.482 0 01-3.483-3.825 9.542 9.542 0 01.871-9.937 9.457 9.457 0 014.095-3.154 9.405 9.405 0 019.772 1.742 9.506 9.506 0 012.767 4.376h2.416a6.06 6.06 0 014.297 1.788A6.123 6.123 0 0133 22.893c0 1.62-.64 3.173-1.78 4.318A6.06 6.06 0 0126.925 29z"
				fill="#fff"
				stroke="#000"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Rect x={14} y={26} width={2} height={8} rx={1} fill="#2793FF" />
			<Rect x={22} y={26} width={2} height={8} rx={1} fill="#2793FF" />
			<Rect x={18} y={28} width={2} height={8} rx={1} fill="#2793FF" />
			<G clipPath="url(#clip0_44_62)" strokeWidth={0.5} strokeLinecap="round" strokeLinejoin="round">
				<Path
					d="M31.917 34.83l-.365-.728-.802.145M31.917 30.164l-.365.73-.802-.147M32.085 33.375h-.17M29.586 32.5h1.896l.437-.875"
					stroke="#3796B8"
				/>
				<Path d="M34.836 33.243a1.167 1.167 0 11-1.167 0V30.17a.583.583 0 111.167 0v3.074z" stroke="#2793FF" />
				<Path
					d="M30.164 31.914l.438.583-.438.584M31.04 35.125l.874-1.75-.437-.875M31.04 29.875l.874 1.75h.583"
					stroke="#3796B8"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_44_62">
					<Path fill="#fff" transform="translate(29 29)" d="M0 0H7V7H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};
