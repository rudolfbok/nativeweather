import { View } from 'react-native';
import { clsx } from 'clsx';

export const HeroSkeleton = () => {
	const styles = 'bg-white/50 dark:bg-[#0F0F11] animate-pulse';

	return (
		<View className={clsx('native:px-4 flex-1 pb-4')} role="status">
			<View className={clsx('grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}>
				<View className={clsx('flex flex-col gap-4')}>
					<View className={clsx('h-72 w-full rounded-3xl md:h-96', styles)} />
					<View className={clsx('h-14 w-full rounded-3xl md:hidden', styles)} />
					<View className={clsx('h-32 w-full rounded-3xl', styles)} />
					<View className={clsx('h-32 w-full rounded-3xl', styles)} />
					<View className={clsx('h-48 w-full rounded-3xl xl:hidden', styles)} />
				</View>

				<View className={clsx('flex flex-col gap-4')}>
					<View className={clsx('h-96 w-full rounded-3xl', styles)} />
					<View className={clsx('native:hidden h-64 w-full rounded-3xl', styles)} />
					<View className={clsx('h-48 w-full rounded-3xl max-md:hidden xl:hidden', styles)} />
				</View>

				<View className={clsx('gap-4 max-lg:hidden max-md:flex')}>
					<View className={clsx('h-32 w-full rounded-3xl md:hidden xl:flex', styles)} />
					<View className={clsx('web:grid web:h-fit web:grid-cols-2 web:xl:grid web:xl:grid-cols-3 gap-4 md:hidden')}>
						{[...Array(9)].map((_, index) => (
							<View key={index} className={clsx('h-44 w-full rounded-3xl', styles)} />
						))}
						<View className={clsx('h-44 w-full rounded-3xl md:hidden', styles)} />
					</View>
				</View>
			</View>
		</View>
	);
};
