import Svg, { Circle, Path } from 'react-native-svg';

export const JapaneseFlag = () => {
	return (
		<Svg width={20} height={20} viewBox="0 0 18 18" fill="none">
			<Path
				d="M16.652 3H1.348C.604 3 0 3.604 0 4.348v9.097c0 .745.604 1.348 1.348 1.348h15.304c.744 0 1.348-.603 1.348-1.348V4.348C18 3.604 17.396 3 16.652 3z"
				fill="#F5F5F5"
			/>
			<Circle cx={9} cy={8.8965} r={3.5379} fill="#FF4B55" />
		</Svg>
	);
};
