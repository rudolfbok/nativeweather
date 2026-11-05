import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { withUniwind } from 'uniwind';

export const WindArrowIcon = withUniwind(({ degree, color }: { degree: number } & Pick<SvgProps, 'color'>) => (
	<Svg width={20} height={18} viewBox="0 0 20 22" fill="none" color={color}>
		<Path
			d="M8.563 1.518a.495.495 0 01.92 0l6.718 15.91a.5.5 0 01-.714.625l-5.448-3.213a2.001 2.001 0 00-2.031-.002l-5.449 3.215a.5.5 0 01-.714-.625l6.718-15.91z"
			stroke="currentColor"
			fill="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			transform={`rotate(${degree} 10 11)`}
		/>
	</Svg>
));
