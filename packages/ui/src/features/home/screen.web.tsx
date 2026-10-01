'use client';

import { useTranslate } from '@tolgee/react';
import { AnimatedView } from '@nativeweather/ui/components/common/animated/AnimatedView.web';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { FavoriteCities } from '@nativeweather/ui/components/weather/home/FavoriteCities';
import { LocalWeather } from '@nativeweather/ui/components/weather/home/LocalWeather';
import { useLocation } from '@nativeweather/ui/hooks/location/useLocation';
import { useFavoriteCities } from '@nativeweather/ui/hooks/weather/useFavoriteCities';
import { useStorageBoolean } from '@nativeweather/core/database/useStorage';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

export const HomeFeature = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const { t } = useTranslate('weather');
	const favoriteCitiesHook = useFavoriteCities({ refresh: true });
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
					{showLocalWeather && (
						<View className={clsx('gap-2')}>
							<StyledText type="sectiontitle">{t('localweather.title')}</StyledText>
							<LocalWeather error={localWeatherError} />
						</View>
					)}
					<FavoriteCities hook={favoriteCitiesHook} />
				</View>
			</ScrollView>
		</AnimatedView>
	);
};
