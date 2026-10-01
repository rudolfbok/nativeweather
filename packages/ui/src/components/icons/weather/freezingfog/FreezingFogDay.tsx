import Svg, { Path, G, Defs, ClipPath, SvgProps } from 'react-native-svg';

export const FreezingFogDay = (props: SvgProps) => {
	return (
		<Svg viewBox="0 0 40 40" fill="none" vectorEffect="none" {...props}>
			<Path
				d="M25 22H10M26.677 27H13.344M15 17h15M13.323 12h13.333"
				stroke="#979797"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<G clipPath="url(#clip0_47_74)" strokeWidth={0.5} strokeLinecap="round" strokeLinejoin="round">
				<Path
					d="M32.917 34.83l-.365-.728-.802.145M32.917 30.164l-.365.73-.802-.147M33.085 33.375h-.17M30.586 32.5h1.896l.437-.875"
					stroke="#3796B8"
				/>
				<Path d="M35.836 33.243a1.167 1.167 0 11-1.167 0V30.17a.583.583 0 111.167 0v3.074z" stroke="#2793FF" />
				<Path
					d="M31.164 31.914l.438.583-.438.584M32.04 35.125l.874-1.75-.437-.875M32.04 29.875l.874 1.75h.583"
					stroke="#3796B8"
				/>
			</G>
			<Path
				d="M26.003 13.803a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6z"
				fill="#FFC002"
				stroke="#FFC002"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M26 4v1.4z" fill="#FFC002" />
			<Path d="M26 4v1.4" stroke="#FFC002" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M26 16.602v1.4z" fill="#FFC002" />
			<Path d="M26 16.602v1.4" stroke="#FFC002" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M21.047 6.047l.987.987z" fill="#FFC002" />
			<Path
				d="M21.047 6.047l.987.987"
				stroke="#FFC002"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M29.96 14.96l.988.988z" fill="#FFC002" />
			<Path d="M29.96 14.96l.988.988" stroke="#FFC002" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M19 11h1.4z" fill="#FFC002" />
			<Path d="M19 11h1.4" stroke="#FFC002" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M31.602 11h1.4z" fill="#FFC002" />
			<Path d="M31.602 11h1.4" stroke="#FFC002" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M22.034 14.96l-.987.988z" fill="#FFC002" />
			<Path
				d="M22.034 14.96l-.987.988"
				stroke="#FFC002"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M30.948 6.047l-.987.987z" fill="#FFC002" />
			<Path
				d="M30.948 6.047l-.987.987"
				stroke="#FFC002"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Defs>
				<ClipPath id="clip0_47_74">
					<Path fill="#fff" transform="translate(30 29)" d="M0 0H7V7H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};
