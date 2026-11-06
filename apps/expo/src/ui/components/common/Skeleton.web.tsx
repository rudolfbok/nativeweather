import { View } from 'react-native';
import { clsx } from 'clsx';

export const Skeleton = ({ className }: { className?: string }) => (
	<View className={clsx('w-full animate-pulse rounded-3xl bg-skeleton', className)} />
);
