import { Skeleton } from './Skeleton';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const HeroSkeleton = () => {
	return (
		<View className={clsx('flex-1 pb-4')} role="status">
			<View className={clsx('grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}>
				<View className={clsx('flex flex-col gap-4')}>
					<Skeleton className={clsx('h-72 md:h-96')} />
					<Skeleton className={clsx('h-14 md:hidden')} />
					<Skeleton className={clsx('h-32')} />
					<Skeleton className={clsx('h-32')} />
					<Skeleton className={clsx('h-48 xl:hidden')} />
				</View>

				<View className={clsx('flex flex-col gap-4')}>
					<Skeleton className={clsx('h-96')} />
					<Skeleton className={clsx('native:hidden h-64')} />
					<Skeleton className={clsx('h-48 max-md:hidden xl:hidden')} />
				</View>

				<View className={clsx('gap-4 max-lg:hidden max-md:flex')}>
					<Skeleton className={clsx('h-32 md:hidden xl:flex')} />
					<View className={clsx('grid h-fit grid-cols-2 gap-4 md:hidden xl:grid xl:grid-cols-3')}>
						{[...Array(9)].map((_, index) => (
							<Skeleton key={index} className={clsx('h-44')} />
						))}
						<Skeleton className={clsx('h-44 md:hidden')} />
					</View>
				</View>
			</View>
		</View>
	);
};
