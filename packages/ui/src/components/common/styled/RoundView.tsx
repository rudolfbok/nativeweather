import { clsx } from 'clsx';
import React from 'react';
import { View } from 'react-native';
import { border } from '@nativeweather/ui/constants/border';

interface RoundViewProps {
	children: React.ReactNode;
	className?: string;
}

export const RoundView = ({ className, children }: RoundViewProps) => {
	return (
		<View
			className={clsx(
				'flex overflow-hidden rounded-3xl bg-systemBackground dark:bg-secondarySystemBackground_dark',
				border,
				className
			)}
		>
			{children}
		</View>
	);
};
