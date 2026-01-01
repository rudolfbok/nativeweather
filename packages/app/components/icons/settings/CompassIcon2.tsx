import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CompassIcon2 = () => {
	return (
		<Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
			<Path
				d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z"
				fill="#fff"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M32.483 15.523l-3.608 10.822a4 4 0 01-2.53 2.53l-10.822 3.608 3.608-10.822a4 4 0 012.53-2.53l10.822-3.608z"
				stroke="red"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
