import { View } from 'react-native';
import { GradientScale } from './GradientScale';
import type { GradientScaleType } from './GradientScale';

interface ScaleBarProps {
	type: GradientScaleType;
	label: string;
	/** Marker position along the scale, 0–1; no marker when null. */
	position: number | null;
}

export const ScaleBar = ({ type, label, position }: ScaleBarProps) => (
	<View className="h-1 w-full justify-center">
		<GradientScale type={type} label={label} />
		{position !== null && (
			<View
				className="absolute h-4 w-1 -translate-x-1/2 rounded-full border border-card-background bg-label"
				style={{ left: `${Math.min(Math.max(position, 0), 1) * 100}%` }}
			/>
		)}
	</View>
);
