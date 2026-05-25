import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import Svg, { Circle, Path } from 'react-native-svg';

export const OpenStreetMapLogo = () => {
	const outlineColor = useSwitchColors('#1F2937', '#FFFFFF');

	return (
		<Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
			<Path d="M7 10.5L20 5l11 5.5L41 6v31.5L28 43l-11-5.5L7 42V10.5z" fill="#7EBC6F" />
			<Path
				d="M20 5v32.5M31 10.5V43M7 10.5l13 6 11-6 10-4.5M7 42l10-4.5 11 5.5 13-5.5"
				stroke={outlineColor}
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<Circle cx={24} cy={23} r={7} fill="#FFFFFF" stroke={outlineColor} strokeWidth={2} />
			<Path d="M28.5 27.5L35 34" stroke={outlineColor} strokeWidth={3} strokeLinecap="round" />
		</Svg>
	);
};
