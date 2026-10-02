import { clsx } from 'clsx';
import { View } from 'react-native';

export const Skeleton = ({ className }: { className?: string }) => (
	<View className={clsx('w-full animate-pulse rounded-3xl bg-white/50 dark:bg-[#0F0F11]', className)} />
);
