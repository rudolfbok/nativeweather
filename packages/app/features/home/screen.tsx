'use client';

import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { useLocation } from 'app/hooks/location/useLocation';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { useWeather } from 'app/hooks/useWeather';
import { useWidgets } from 'app/hooks/useWidgets';
import { useStorageBoolean, useStorageString } from 'app/storage/useStorage';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeFeature = () => {
	const { t } = useTranslate('weather');
	const { localWeatherData } = useLocalWeather();
	const { weatherData, setWeatherData } = useWeather();
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const [currentSource] = useStorageString('currentSource');
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const favoriteCitiesHook = useFavoriteCities();
	const { getLocalWeather, error: localWeatherError } = useLocation();
	const { text } = useThemeColors();

	useWidgets();

	useEffect(() => {
		if (showLocalWeather && !localWeatherData) {
			void getLocalWeather();
		}
	}, [showLocalWeather, localWeatherData, getLocalWeather]);

	// useEffect(() => {
	// 	if (!showLocalWeather || weatherData) return;

	// 	(async () => {
	// 		const data = await fetchWeather(
	// 			`${localWeatherData.location.name}${localWeatherData.location.region}${localWeatherData.location.country}`,
	// 			currentSource
	// 		);

	// 		setWeatherData(data);
	// 	})();
	// }, [showLocalWeather, weatherData, localWeatherData, currentSource]);

	return (
		<View className={clsx('w-full flex-1')}>
			<View
				className={clsx('bg-secondarySystemBackground dark:bg-systemBackground_dark px-4 pb-4')}
				style={{ paddingTop: insets.top + 8 }}
			>
				<NativeWeatherLogo />
			</View>
			<ScreenWrapper
				refreshControl={
					<RefreshControl
						tintColor={text}
						refreshing={refreshing}
						onRefresh={() => favoriteCitiesHook.refreshFavoriteCities({ displayToast: true, setRefreshing })}
						style={{ zIndex: 100 }}
					/>
				}
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
			</ScreenWrapper>
		</View>
	);
};
