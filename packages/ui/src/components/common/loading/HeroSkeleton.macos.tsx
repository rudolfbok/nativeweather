import { Skeleton } from '@nativeweather/ui/components/common/loading/Skeleton';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const HeroSkeleton = () => {
	const styles = 'bg-white/50 dark:bg-[#0F0F11]';

	return (
		<View className={clsx('flex-1 p-4')} role="status">
			<View className={clsx('flex-1 flex-row gap-4')}>
				<View className={clsx('flex-1 gap-4')}>
					<Skeleton className={clsx('h-96 w-full rounded-3xl', styles)} />
					<Skeleton className={clsx('h-32 w-full rounded-3xl', styles)} />
					<Skeleton className={clsx('h-32 w-full rounded-3xl', styles)} />
					<Skeleton className={clsx('h-64 w-full rounded-3xl', styles)} />
				</View>
				<View className={clsx('flex-1 gap-4')}>
					<Skeleton className={clsx('h-96 w-full rounded-3xl', styles)} />
					<Skeleton className={clsx('h-64 w-full rounded-3xl', styles)} />
					<Skeleton className={clsx('h-64 w-full rounded-3xl', styles)} />
				</View>
			</View>
		</View>
	);
};
