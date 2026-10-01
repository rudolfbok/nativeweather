import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const GermanFlag = () => {
	return (
		<Svg width={20} height={20} viewBox="0 0 18 18" fill="none">
			<G clipPath="url(#clip0_286_55)">
				<Path d="M0 3h18v4H0z" fill="#1A1A1A" />
				<Path d="M0 7h18v4H0z" fill="#D80027" />
				<Path d="M0 11h18v4H0z" fill="#FFDA44" />
			</G>
			<Defs>
				<ClipPath id="clip0_286_55">
					<Path d="M1.348 3h15.304C17.396 3 18 3.604 18 4.348v9.304c0 .745-.604 1.348-1.348 1.348H1.348C.604 15 0 14.396 0 13.652V4.348C0 3.604.604 3 1.348 3z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};
