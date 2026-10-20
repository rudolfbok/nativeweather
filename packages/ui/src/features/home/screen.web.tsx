'use client';

import { useStorageBoolean } from '@nativeweather/core/database/useStorage';
import { AnimatedView } from '../../components/common/animated/AnimatedView.web';
import { FavoriteCities } from '../../components/weather/home/FavoriteCities';
import { LocalWeather } from '../../components/weather/home/LocalWeather';
import { useLocation } from '@nativeweather/core/hooks/location/useLocation';
import { useFavoriteCityWeather } from '../../hooks/weather/useFavoriteCityWeather';
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
