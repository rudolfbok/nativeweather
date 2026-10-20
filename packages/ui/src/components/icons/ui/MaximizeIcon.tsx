import { useThemeColors } from '../../../hooks/theme/useThemeColors';
import Svg, { Path } from 'react-native-svg';

export const MaximizeIcon = () => {
	const { text } = useThemeColors();

	return (
		<Svg width={24} height={24} viewBox="0 0 26 26" fill="none">
			<Path
				d="M16 5h5v5M21 5l-6 6M5 21l6-6M10 21H5v-5"
				stroke={text}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
