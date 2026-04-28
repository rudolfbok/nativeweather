'use client';

import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { useCurrentLocation } from 'app/hooks/location/useCurrentLocation';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useWidgets } from 'app/hooks/useWidgets';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeFeature = () => {
	const { t } = useTranslate('weather');
	const { localWeatherData } = useLocalWeather();
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const favoriteCitiesHook = useFavoriteCities();
	const { getLocalWeather } = useCurrentLocation();

	useWidgets();

	useEffect(() => {
		if (!localWeatherData) {
			getLocalWeather();
		}
	}, [localWeatherData, getLocalWeather]);

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
						tintColor="#007AFF"
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
							<LocalWeather />
						</View>
					)}
					<FavoriteCities hook={favoriteCitiesHook} />
				</View>
			</ScreenWrapper>
		</View>
	);
};
