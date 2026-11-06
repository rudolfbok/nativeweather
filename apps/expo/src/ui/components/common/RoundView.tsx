import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { clsx } from 'clsx';

export const RoundView = ({ className, ...props }: ViewProps) => (
	<View
		className={clsx('overflow-hidden rounded-3xl border border-hairline bg-card-background', className)}
		{...props}
	/>
);
