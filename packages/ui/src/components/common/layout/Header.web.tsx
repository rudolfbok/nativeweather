'use client';

import { SettingsFeature } from '@nativeweather/ui/features/settings/screen';
import { useOpenDrawer } from '@nativeweather/ui/hooks/navigation/useOpenDrawer';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { Squash as Hamburger } from 'hamburger-react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { NativeWeatherLogo } from '@nativeweather/ui/components/icons/logos/NativeWeatherLogo';
import { SearchBar } from '@nativeweather/ui/components/weather/search/SearchBar';
import { AnimatedView } from '../animated/AnimatedView.web';

export const Header = () => {
	const router = useRouter();
	const { openDrawer, setOpenDrawer } = useOpenDrawer();
	const { text } = useThemeColors();

	return (
		<>
			<View
				className={clsx(
					'z-10 flex w-full max-w-full flex-row flex-wrap items-center justify-between bg-secondarySystemBackground pb-3 pt-2 dark:bg-systemBackground_dark'
				)}
			>
				<View className={clsx('order-1 justify-center md:w-1/4 xl:w-1/3')}>
					<Pressable onPress={() => router.push('/')} className={clsx('w-fit cursor-pointer')}>
						<NativeWeatherLogo />
					</Pressable>
				</View>
				<View
					className={clsx(
						'z-10 order-3 flex w-full items-center justify-center transition-all md:order-2 md:w-1/2 md:px-1 xl:w-1/3'
					)}
				>
					<SearchBar />
				</View>
				<View className={clsx('z-50 order-2 flex flex-row items-center justify-end md:w-1/4 xl:w-1/3')}>
					<View className={clsx('-mr-2')}>
						<Hamburger toggled={openDrawer} size={22} color={text} onToggle={() => setOpenDrawer(!openDrawer)} />
					</View>
				</View>
			</View>
			<View
				className={clsx(
					'fixed bottom-0 right-0 top-0 z-50 w-full bg-secondarySystemBackground transition-transform duration-300 ease-out md:w-[340px] dark:bg-systemBackground_dark',
					openDrawer ? 'translate-x-0' : 'translate-x-full'
				)}
			>
				<View className={clsx('absolute right-0 z-50 mr-2 mt-2')}>
					<Hamburger toggled={openDrawer} size={22} color={text} onToggle={() => setOpenDrawer(!openDrawer)} />
				</View>
				<ScrollView
					className={clsx('flex-1', openDrawer && 'no-overlay-scroll')}
					showsVerticalScrollIndicator={false}
					contentContainerClassName={clsx('pt-10')}
				>
					<SettingsFeature />
				</ScrollView>
			</View>
			<AnimatedView
				className={clsx(
					'inset-0 z-40 bg-black/30 max-md:hidden md:fixed dark:bg-black/60',
					!openDrawer && 'pointer-events-none'
				)}
				duration={250}
				visible={openDrawer}
			>
				<Pressable onPress={() => setOpenDrawer(false)} className={clsx('h-full w-full')} />
			</AnimatedView>
		</>
	);
};
