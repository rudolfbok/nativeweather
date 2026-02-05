'use client';

import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo.web';
import { FavoriteCities } from 'app/components/weather/favorites/FavoriteCities';
import { LocalWeather } from 'app/components/weather/local/LocalWeather';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeFeature = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const favoriteCitiesHook = useFavoriteCities();

	return (
		<View className={clsx('w-full flex-1')}>
			<View
				className={clsx('bg-secondarySystemBackground dark:bg-systemBackground_dark px-4 pb-4')}
				style={{ paddingTop: insets.top + 8 }}
			>
				<NativeWeatherLogo />
			</View>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				contentContainerClassName={clsx('px-4 pb-4')}
				refreshControl={
					<RefreshControl
						tintColor="blue"
						refreshing={refreshing}
						onRefresh={() => favoriteCitiesHook.refreshFavoriteCities({ displayToast: true, setRefreshing })}
						progressViewOffset={insets.top + 100}
						style={{ zIndex: 100 }}
					/>
				}
			>
				<View className={clsx('gap-2')}>
					{showLocalWeather && <LocalWeather />}
					<FavoriteCities hook={favoriteCitiesHook} />
				</View>
			</ScrollView>
		</View>
	);
};
