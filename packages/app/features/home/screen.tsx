'use client';

import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import 'app/components/weather/widgets/NativeWeatherLocalWidget';
import NativeWeatherLocalWidget from 'app/components/weather/widgets/NativeWeatherLocalWidget';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useSwitchTemp } from 'app/hooks/switch/useSwitchTemp';
import { useStorageString } from 'app/storage/useStorageString';
import { useMapConditions } from 'app/hooks/conditions/useMapConditions';
import { weatherLandscapeBg } from 'app/utils/mappings/mapBgLandscapes';

export const HomeFeature = () => {
	const { t } = useTranslate('weather');
	const { localWeatherData } = useLocalWeather();
	const [currentTemp] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const favoriteCitiesHook = useFavoriteCities();
	const mapConditions = useMapConditions();

	const localTemp = useSwitchTemp({
		celsius: localWeatherData.current.tempC,
		fahrenheit: localWeatherData.current.tempF,
		currentTemp: currentTemp,
	});

	NativeWeatherLocalWidget.updateSnapshot({
		bgColor: weatherLandscapeBg({
			isDay: localWeatherData.current.isDay,
			code: localWeatherData.current.condition.code,
		}),
		city: localWeatherData.location.name,
		region: localWeatherData.location.region,
		temperature: localTemp,
		condition: mapConditions(localWeatherData.current.condition.code, localWeatherData.current.isDay, currentSource),
		isDay: localWeatherData.current.isDay,
		code: localWeatherData.current.condition.code,
		currentSource: currentSource,
	});

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
					{showLocalWeather && (
						<View className={clsx('gap-2')}>
							<StyledText type="maintitle">{t('localweather.title')}</StyledText>
							<LocalWeather />
						</View>
					)}
					<FavoriteCities hook={favoriteCitiesHook} />
				</View>
			</ScrollView>
		</View>
	);
};
