import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export const Skeleton = ({ className }: { className?: string }) => (
	<View className={twMerge('w-full animate-pulse rounded-3xl bg-skeleton', className)} />
);
