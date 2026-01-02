'use client';

import { useTranslate } from '@tolgee/react';
import { SettingsFeature } from 'app/features/settings/screen';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { clsx } from 'clsx';
import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'solito/navigation';
import { NativeWeatherLogo } from '../icons/logos/NativeWeatherLogo';
import { SearchBar } from '../weather/search/SearchBar';

export const Header = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<>
			<View
				className={clsx(
					'bg-secondarySystemBackground dark:bg-systemBackground_dark z-10 flex w-full max-w-full flex-row flex-wrap items-center justify-between pb-3 md:pt-2'
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
						<Hamburger
							toggled={openDrawer}
							size={22}
							color={useSwitchColors('black', 'white')}
							onToggle={() => setOpenDrawer(!openDrawer)}
						/>
					</View>
				</View>
			</View>
			<View
				className={clsx(
					'bg-secondarySystemBackground dark:bg-systemBackground_dark fixed bottom-0 right-0 top-0 z-50 w-full transition-transform duration-300 ease-out md:w-[340px]',
					openDrawer ? 'translate-x-0' : 'translate-x-full'
				)}
			>
				<View className={clsx('absolute right-0 z-50 mr-2 md:mt-2')}>
					<Hamburger toggled={openDrawer} size={22} color="#007AFF" onToggle={() => setOpenDrawer(!openDrawer)} />
				</View>
				<ScrollView className={clsx('flex-1')} contentContainerClassName="pt-12">
					<SettingsFeature title={t('settings')} />
				</ScrollView>
			</View>
			{openDrawer && (
				<Pressable
					onPress={() => setOpenDrawer(false)}
					className={clsx('inset-0 z-40 bg-black/30 transition-opacity max-md:hidden md:fixed dark:bg-black/60')}
				/>
			)}
		</>
	);
};
