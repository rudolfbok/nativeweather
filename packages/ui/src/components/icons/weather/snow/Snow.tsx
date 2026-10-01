import Svg, { Path, SvgProps } from 'react-native-svg';

export const Snow = (props: SvgProps) => {
	return (
		<Svg viewBox="0 0 40 40" fill="none" vectorEffect="none" {...props}>
			<Path
				d="M17.67 29.333l-1.46-2.916-3.207.583m4.666-16.333l-1.458 2.916L13.003 13m9.333 16.333l1.458-2.916 3.209.583m-4.667-16.333l1.458 2.916L27.003 13m-1.167 17.5l-3.5-7m0 0h-4.667m4.667 0l1.75-3.5m-6.417 3.5l-3.5 7m3.5-7L15.92 20m9.917-10.5l-3.5 7m0 0l1.75 3.5m-1.75-3.5h-4.667m6.417 3.5h7.583M8.336 20h7.583m0 0l1.75-3.5m0 0l-3.5-7m15.167 8.167L27.586 20l1.75 2.333m-18.667-4.666L12.42 20l-1.75 2.333"
				stroke="#3796B8"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
