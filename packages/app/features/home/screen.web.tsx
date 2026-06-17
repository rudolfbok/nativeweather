'use client';

import { useTranslate } from '@tolgee/react';
import { AnimatedView } from 'app/components/common/animated/AnimatedView.web';
import { StyledText } from 'app/components/common/styled/StyledText';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { useLocation } from 'app/hooks/location/useLocation';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useStorageBoolean } from 'app/storage/useStorage';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

export const HomeFeature = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const { t } = useTranslate('weather');
	const favoriteCitiesHook = useFavoriteCities();
	const { getLocalWeather, error: localWeatherError } = useLocation();
	const { localWeatherData } = useLocalWeather();

	useEffect(() => {
		if (showLocalWeather && !localWeatherData) {
			void getLocalWeather();
		}
	}, [showLocalWeather, localWeatherData, getLocalWeather]);

	return (
		<AnimatedView duration={25}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 16 }}
			>
				<View className={clsx('gap-2')}>
					{showLocalWeather && (
						<View className={clsx('gap-2')}>
							<StyledText type="maintitle">{t('localweather.title')}</StyledText>
							<LocalWeather error={localWeatherError} />
						</View>
					)}
					<FavoriteCities hook={favoriteCitiesHook} />
				</View>
			</ScrollView>
		</AnimatedView>
	);
};
