import { View } from 'react-native';
import { clsx } from 'clsx';

export const Skeleton = ({ className, fill = false }: { className?: string; fill?: boolean }) => (
	<View className={clsx('w-full animate-pulse rounded-3xl bg-skeleton', fill && 'flex-1', className)} />
);
