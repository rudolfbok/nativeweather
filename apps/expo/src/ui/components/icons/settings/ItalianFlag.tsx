import Svg, { Path } from 'react-native-svg';

export const ItalianFlag = () => {
	return (
		<Svg width={20} height={20} viewBox="0 0 18 18" fill="none">
			<Path d="M6 3h6v11.793H6z" fill="#F5F5F5" />
			<Path d="M1.348 3H6v11.793H1.348C.604 14.793 0 14.19 0 13.445V4.348C0 3.604.604 3 1.348 3z" fill="#009246" />
			<Path d="M12 3h4.652C17.396 3 18 3.604 18 4.348v9.097c0 .745-.604 1.348-1.348 1.348H12V3z" fill="#FF4B55" />
		</Svg>
	);
};
