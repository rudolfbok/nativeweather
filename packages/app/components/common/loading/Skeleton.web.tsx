import { clsx } from 'clsx';
import { View } from 'react-native';

interface SkeletonProps {
	className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
	<View className={clsx('animate-pulse', className)} />
);
