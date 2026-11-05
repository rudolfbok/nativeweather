import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export const RoundView = ({ className, ...props }: ViewProps) => (
	<View
		className={twMerge('overflow-hidden rounded-3xl border border-hairline bg-card-background', className)}
		{...props}
	/>
);
