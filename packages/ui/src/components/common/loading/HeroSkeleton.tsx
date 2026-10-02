import { Skeleton } from '@nativeweather/ui/components/common/loading/Skeleton';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const HeroSkeleton = () => {
	const styles = 'bg-white/50 dark:bg-[#0F0F11]';

	return (
		<View className={clsx('flex-1 gap-4 px-4 pb-4')} role="status">
			<Skeleton className={clsx('h-72 w-full rounded-3xl', styles)} />
			<Skeleton className={clsx('h-14 w-full rounded-3xl', styles)} />
			<Skeleton className={clsx('h-32 w-full rounded-3xl', styles)} />
			<Skeleton className={clsx('h-32 w-full rounded-3xl', styles)} />
			<Skeleton className={clsx('h-48 w-full rounded-3xl', styles)} />
		</View>
	);
};
