'use client';

import { useStorageBoolean } from '@nativeweather/core/database/useStorage';
import { AnimatedView } from '@nativeweather/ui/components/common/animated/AnimatedView.web';
import { FavoriteCities } from '@nativeweather/ui/components/weather/home/FavoriteCities';
import { LocalWeather } from '@nativeweather/ui/components/weather/home/LocalWeather';
import { useLocation } from '@nativeweather/ui/hooks/location/useLocation';
import { useFavoriteCityWeather } from '@nativeweather/ui/hooks/weather/useFavoriteCityWeather';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

export const HomeFeature = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const favoriteCitiesHook = useFavoriteCityWeather({ refresh: true });
	const { getLocalWeather, error: localWeatherError } = useLocation();

	useEffect(() => {
		if (showLocalWeather) {
			getLocalWeather();
		}
	}, [showLocalWeather, getLocalWeather]);

	return (
		<AnimatedView duration={250}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 16 }}
			>
				<View className={clsx('gap-2')}>
					{showLocalWeather && <LocalWeather error={localWeatherError} />}
					<FavoriteCities hook={favoriteCitiesHook} />
				</View>
			</ScrollView>
		</AnimatedView>
	);
};
