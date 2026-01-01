import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const WindDirectionIcon = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<G clipPath="url(#clip0_348_2)">
				<Path
					d="M19.518 3.999a.495.495 0 01.65.65l-6.499 16a.5.5 0 01-.947-.062l-1.58-6.124a2 2 0 00-1.435-1.438l-6.126-1.58a.5.5 0 01-.063-.947l16-6.5z"
					fill="#fff"
					stroke="#fff"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_348_2">
					<Path fill="#fff" d="M0 0H24V24H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};
