import { useId } from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const scaleStops = {
	'eu-aqi': [
		'#4FF0E6',
		'#50F0E6',
		'#3BDAAC',
		'#0BA41D',
		'#80AD01',
		'#FFB600',
		'#FF8401',
		'#FF5A01',
		'#FF0101',
		'#CD014D',
		'#990099',
	],
	'us-aqi': [
		'#009900',
		'#80AD01',
		'#FFC100',
		'#FF9801',
		'#FF6F01',
		'#FF3700',
		'#FF0101',
		'#DB0136',
		'#9A0199',
		'#8F1064',
		'#84212F',
	],
	uv: [
		'#01FF01',
		'#5DF500',
		'#BCEB01',
		'#FFBB01',
		'#FF8A01',
		'#FF5B00',
		'#FF0100',
		'#E60143',
		'#D0007B',
		'#B700BC',
		'#9E00FF',
	],
} as const;

export type GradientScaleType = keyof typeof scaleStops;

interface GradientScaleProps {
	type: GradientScaleType;
	label: string;
}

export const GradientScale = ({ type, label }: GradientScaleProps) => {
	const gradientId = useId().replace(/:/g, '');

	return (
		<Svg width="100%" height="4" viewBox="0 0 100 4" preserveAspectRatio="none" accessibilityLabel={label}>
			<Defs>
				<LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
					{scaleStops[type].map((color, index) => (
						<Stop key={color} offset={`${index * 10}%`} stopColor={color} />
					))}
				</LinearGradient>
			</Defs>
			<Rect width="100%" height="100%" fill={`url(#${gradientId})`} />
		</Svg>
	);
};
