import { Skeleton } from './Skeleton';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const HeroSkeleton = () => {
	return (
		<View className={clsx('flex-1 gap-4 px-4 pb-4')} role="status">
			<Skeleton className={clsx('h-72')} />
			<Skeleton className={clsx('h-14')} />
			<Skeleton className={clsx('h-32')} />
			<Skeleton className={clsx('h-32')} />
			<Skeleton className={clsx('h-48')} />
		</View>
	);
};
