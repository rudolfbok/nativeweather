import Svg, { Path } from 'react-native-svg';

export const PolishFlag = () => {
	return (
		<Svg width={20} height={20} viewBox="0 0 18 18" fill="none">
			<Path
				d="M16.652 3H1.348C.604 3 0 3.604 0 4.348v9.097c0 .745.604 1.348 1.348 1.348h15.304c.744 0 1.348-.603 1.348-1.348V4.348C18 3.604 17.396 3 16.652 3z"
				fill="#F5F5F5"
			/>
			<Path
				d="M0 8.8965h18v4.5485c0 .745-.604 1.348-1.348 1.348H1.348C.604 14.793 0 14.19 0 13.445V8.8965z"
				fill="#FF4B55"
			/>
		</Svg>
	);
};
