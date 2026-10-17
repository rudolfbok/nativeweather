import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import Svg, { Path } from 'react-native-svg';

export const EditIcon = () => {
	const { text } = useThemeColors();

	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M19.298 7.09a2.396 2.396 0 00-3.388-3.388L4.566 15.049a1.7 1.7 0 00-.425.705l-1.123 3.7a.425.425 0 00.53.528l3.7-1.122a1.7 1.7 0 00.705-.422L19.298 7.09zM14 6l3 3"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				stroke={text}
			/>
		</Svg>
	);
};
