'use client';

import { AnimatedView } from 'app/components/common/AnimatedView.web';
import { FavoriteCities } from 'app/components/weather/favorites/FavoriteCities';
import { LocalWeather } from 'app/components/weather/local/LocalWeather';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { ScrollView, View } from 'react-native';

export const HomeFeature = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');

	const favoriteCitiesHook = useFavoriteCities();

	return (
		<AnimatedView transition={{ duration: 500 }}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 16 }}
			>
				<View className={clsx('gap-2')}>
					{showLocalWeather && <LocalWeather />}
					<FavoriteCities hook={favoriteCitiesHook} />
				</View>
			</ScrollView>
		</AnimatedView>
	);
};
