import Svg, { Path } from 'react-native-svg';

export const EditIcon = () => {
	return (
		<Svg width={26} height={26} viewBox="0 0 26 26" fill="none" style={{ pointerEvents: 'none' }}>
			<Path
				d="M12.5 6H6.667A1.667 1.667 0 005 7.667v11.666A1.666 1.666 0 006.667 21h11.666A1.666 1.666 0 0020 19.333V13.5"
				stroke="#007AFF"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M17.896 5.533a1.818 1.818 0 112.572 2.57l-7.726 7.727a1.715 1.715 0 01-.73.433l-2.463.72a.428.428 0 01-.532-.532l.72-2.462c.081-.276.23-.527.434-.73l7.725-7.726z"
				stroke="#007AFF"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
