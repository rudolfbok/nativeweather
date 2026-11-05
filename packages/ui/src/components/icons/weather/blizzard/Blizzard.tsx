import Svg, { Path, SvgProps } from 'react-native-svg';

export const Blizzard = (props: SvgProps) => {
	return (
		<Svg viewBox="0 0 40 40" fill="none" vectorEffect="none" {...props}>
			<Path
				d="M14.664 26.336a1.665 1.665 0 002.581-.806 1.667 1.667 0 00-1.58-2.194h-10M18.58 16.67a2.084 2.084 0 111.667 3.333H5.664M12.164 13.67a1.665 1.665 0 012.581.806 1.667 1.667 0 01-1.58 2.193h-7.5"
				stroke="#979797"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M24.33 26.667l-1.04-2.084-2.293.417m3.334-11.667l-1.042 2.084L20.997 15m6.667 11.667l1.042-2.084 2.291.417m-3.333-11.667l1.042 2.084L30.997 15m-.833 12.5l-2.5-5m0 0h-3.333m3.333 0l1.25-2.5m-4.583 2.5l-2.5 5m2.5-5L23.08 20m7.083-7.5l-2.5 5m0 0l1.25 2.5m-1.25-2.5h-3.333m4.583 2.5h5.417m-16.667 0h5.417m0 0l1.25-2.5m0 0l-2.5-5m10.833 5.833L31.414 20l1.25 1.667m-13.333-3.334L20.58 20l-1.25 1.667"
				stroke="#3796B8"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
