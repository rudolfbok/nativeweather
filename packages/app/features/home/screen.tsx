'use client';

import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { useLocation } from 'app/hooks/location/useLocation';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useTextColor } from 'app/hooks/useThemeColors';
import { useWidgets } from 'app/hooks/useWidgets';
import { useStorageBoolean } from 'app/storage/useStorage';
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
	const { getLocalWeather, error: localWeatherError } = useLocation();
	const textColor = useTextColor();

	useWidgets();

	useEffect(() => {
		if (showLocalWeather && !localWeatherData) {
			void getLocalWeather();
		}
	}, [showLocalWeather, localWeatherData, getLocalWeather]);

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
						tintColor={textColor}
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
