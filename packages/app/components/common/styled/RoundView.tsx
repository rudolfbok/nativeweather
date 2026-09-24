import { border } from 'app/constants/border';
import { clsx } from 'clsx';
import React from 'react';
import { View } from 'react-native';

interface RoundViewProps {
	children: React.ReactNode;
	className?: string;
}

export const RoundView = ({ className, children }: RoundViewProps) => {
	return (
		<View
			className={clsx(
				'bg-systemBackground dark:bg-secondarySystemBackground_dark flex overflow-hidden rounded-3xl',
				border,
				className
			)}
		>
			{children}
		</View>
	);
};
