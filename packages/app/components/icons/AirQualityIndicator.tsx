import Svg, { Path } from 'react-native-svg';

export const AirQualityIndicator = ({ fill }: { fill: string | undefined }) => {
	return (
		<Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
			<Path d="M5 9a4 4 0 100-8 4 4 0 000 8z" fill={fill} />
		</Svg>
	);
};
