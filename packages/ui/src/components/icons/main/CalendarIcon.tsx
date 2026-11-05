import Svg, { Path } from 'react-native-svg';

export const CalendarIcon = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M21.974 8.125V20a2.86 2.86 0 01-.851 2.032 2.92 2.92 0 01-2.055.843H4.928c-.77 0-1.51-.303-2.054-.843A2.86 2.86 0 012.024 20V8.125h19.95z"
				fill="#F2F2F7"
				stroke="#F2F2F7"
				strokeWidth={0.25}
			/>
			<Path
				d="M15.25 6V2a.75.75 0 111.5 0v4a.75.75 0 11-1.5 0zm-8 0V2a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0z"
				fill="#FD0200"
				stroke="#FD0200"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M19.003 2.953a3.05 3.05 0 013.05 3.05v2.05h-20.1v-2.05a3.05 3.05 0 013.05-3.05h14z"
				fill="#FD0200"
				stroke="#FD0200"
				strokeWidth={0.1}
			/>
			<Path
				d="M16.497 13h-5.7M7 13h.01M7 17.523h.01M16.497 17.523h-5.7"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
