import Svg, { Path } from 'react-native-svg';

export const Calendar = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path d="M2 8h20v12a3 3 0 01-3 3H5a3 3 0 01-3-3V8z" fill="#F2F2F7" />
			<Path
				d="M15.25 6V2a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0zM7.25 6V2a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0z"
				fill="#FD0200"
				stroke="#FD0200"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M19 2.95A3.05 3.05 0 0122.05 6v2.05H1.95V6A3.05 3.05 0 015 2.95h14z"
				fill="#FD0200"
				stroke="#FD0200"
				strokeWidth={0.1}
			/>
			<Path
				d="M17 13.563h-6M13 17.742H7M7 13.563h.01M17 17.742h.01"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
