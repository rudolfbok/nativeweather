import { Skeleton } from './Skeleton';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const HeroSkeleton = () => {
	return (
		<View className={clsx('flex-1 flex-row gap-4')} role="status">
			<View className={clsx('flex-1 gap-4')}>
				<Skeleton className={clsx('h-96')} />
				<Skeleton className={clsx('h-32')} />
				<Skeleton className={clsx('h-32')} />
				<Skeleton className={clsx('h-64')} />
			</View>
			<View className={clsx('flex-1 gap-4')}>
				<Skeleton className={clsx('h-96')} />
				<Skeleton className={clsx('h-64')} />
				<Skeleton className={clsx('h-64')} />
			</View>
		</View>
	);
};
