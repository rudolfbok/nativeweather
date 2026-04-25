'use client';

import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NativeWeatherLocalWidget from 'app/components/weather/widgets/NativeWeatherLocalWidget';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useSwitchTemp } from 'app/hooks/switch/useSwitchTemp';
import { useStorageString } from 'app/storage/useStorageString';
import { useMapConditions } from 'app/hooks/conditions/useMapConditions';
import { weatherLandscapeBg } from 'app/utils/mappings/mapBgLandscapes';
import { useCurrentLocation } from 'app/hooks/location/useCurrentLocation';
import { getWeatherIconUri } from 'app/utils/getWeatherIconUri';
import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';

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
	const { getLocalWeather } = useCurrentLocation();
	const [imagePathURI, setImagePathURI] = useState<string | null>(null);

	useEffect(() => {
		if (!localWeatherData) {
			getLocalWeather();
		}
	}, [localWeatherData, getLocalWeather]);

	const localTemp = useSwitchTemp({
		celsius: localWeatherData?.current.tempC,
		fahrenheit: localWeatherData?.current.tempF,
		currentTemp,
	});

	const localTempMin = useSwitchTemp({
		celsius: localWeatherData?.forecast.forecastday[0].day.minTempC,
		fahrenheit: localWeatherData?.forecast.forecastday[0].day.minTempF,
		currentTemp,
	});

	const localTempMax = useSwitchTemp({
		celsius: localWeatherData?.forecast.forecastday[0].day.maxTempC,
		fahrenheit: localWeatherData?.forecast.forecastday[0].day.maxTempF,
		currentTemp,
	});

	const feelsLikeTemperature = useSwitchTemp({
		celsius: localWeatherData?.current.feelsLikeC,
		fahrenheit: localWeatherData?.current.feelsLikeF,
		currentTemp,
	});

	useEffect(() => {
		let cancelled = false;

		async function loadIcon() {
			if (!localWeatherData) {
				setImagePathURI(null);
				return;
			}

			try {
				const uri = await getWeatherIconUri({
					isDay: localWeatherData.current.isDay,
					code: localWeatherData.current.condition.code,
				});

				if (!cancelled) {
					setImagePathURI(uri);
				}
			} catch (error) {
				console.error('Failed to resolve widget weather icon URI', error);
				if (!cancelled) {
					setImagePathURI(null);
				}
			}
		}

		loadIcon();

		return () => {
			cancelled = true;
		};
	}, [localWeatherData?.current.isDay, localWeatherData?.current.condition.code]);

	useEffect(() => {
		if (!localWeatherData || !imagePathURI) return;

		NativeWeatherLocalWidget.updateSnapshot({
			imagePath: imagePathURI,
			bgColor: weatherLandscapeBg({
				isDay: localWeatherData.current.isDay,
				code: localWeatherData.current.condition.code,
			}),
			city: localWeatherData.location.name,
			region: localWeatherData.location.region,
			temperature: localTemp,
			minTemperature: localTempMin,
			maxTemperature: localTempMax,
			feelsLikeTemperature: feelsLikeTemperature,
			condition: mapConditions(localWeatherData.current.condition.code, localWeatherData.current.isDay, currentSource),
			isDay: localWeatherData.current.isDay,
			code: localWeatherData.current.condition.code,
			currentSource,
		});
	}, [localWeatherData, imagePathURI, localTemp, currentSource, mapConditions]);

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
