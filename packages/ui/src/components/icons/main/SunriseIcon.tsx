import Svg, { Path } from 'react-native-svg';

export const SunriseIcon = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 2v8M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.066 10.93l-1.41 1.41M22 22H2M16 6l-4-4-4 4"
				stroke="#FFBF04"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M16 18a4 4 0 10-8 0" fill="#FFBF04" />
			<Path d="M16 18a4 4 0 10-8 0" stroke="#FFBF04" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<Path stroke="#FFBF04" strokeWidth={2} strokeLinecap="round" d="M7.99868 17.9987L15.9986 17.9882" />
		</Svg>
	);
};
