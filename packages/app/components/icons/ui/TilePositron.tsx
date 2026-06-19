import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const TilePositron = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M14.719 5.854L9.005 3.18v15.009l5.714 2.625V5.854zM3 5.768l5.714-2.674v15.01L3 20.727V5.768zM15.29 5.854l5.713-2.674v15.009l-5.714 2.625V5.854z"
				fill="#fff"
			/>
			<Path
				d="M3.671 15.053l4.507-2.697.188 5.25-4.522 2.197-.173-4.75zM9.877 11.594l5.47 3.54-.162 4.915-6.03-1.253.722-7.202z"
				fill="#C2C2C2"
			/>
			<Path d="M15.054 15.174l5.04-3.028.992 5.187-5.708 2.531-.324-4.69z" fill="#C2C2C2" />
			<Path
				d="M15 5.766v15M9 3.234v15M14.106 5.551a2 2 0 001.788 0l3.659-1.83A1 1 0 0121 4.617v12.764a1 1 0 01-.553.894l-4.553 2.277a2 2 0 01-1.788 0l-4.212-2.106a2 2 0 00-1.788 0l-3.659 1.83A1 1 0 013 19.38V6.616a1 1 0 01.553-.894l4.553-2.277a2 2 0 011.788 0l4.212 2.106z"
				stroke="#000"
				strokeWidth={1.7}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
