'use client';

import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { useStorageBoolean, useStorageString } from 'app/database/useStorage';
import { useLocation } from 'app/hooks/location/useLocation';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useWidgets } from 'app/hooks/widgets/useWidgets';
import { clsx } from 'clsx';
import { BlurTargetView, BlurView } from 'expo-blur';
import { cssInterop, useColorScheme } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { Platform, RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StyledBlurView = cssInterop(BlurView, { className: 'style' });
const StyledBlurTargetView = cssInterop(BlurTargetView, { className: 'style' });

export const HomeFeature = () => {
	const { t } = useTranslate('weather');
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const [currentSource] = useStorageString('currentSource');
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const headerHeight = insets.top;
	const blurTarget = useRef<View>(null);
	const favoriteCitiesHook = useFavoriteCities({ refresh: true });
	const { getLocalWeather, error: localWeatherError } = useLocation();
	const { text } = useThemeColors();

	useWidgets();

	useEffect(() => {
		if (showLocalWeather && currentSource) {
			getLocalWeather();
		}
	}, [showLocalWeather, currentSource, getLocalWeather]);

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
			<StyledBlurTargetView ref={blurTarget} className="flex-1">
				<ScrollView
					contentInsetAdjustmentBehavior="never"
					contentContainerClassName="px-4 pb-4"
					contentInset={Platform.OS === 'ios' ? { top: headerHeight, bottom: insets.bottom } : undefined}
					contentOffset={Platform.OS === 'ios' ? { x: 0, y: -headerHeight } : undefined}
					contentContainerStyle={Platform.OS === 'android' ? { paddingTop: headerHeight } : undefined}
					scrollIndicatorInsets={{ top: headerHeight, bottom: insets.bottom }}
					automaticallyAdjustsScrollIndicatorInsets={false}
					refreshControl={
						<RefreshControl
							tintColor={text}
							progressViewOffset={Platform.OS === 'android' ? headerHeight : undefined}
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
				</ScrollView>
			</StyledBlurTargetView>
			<StyledBlurView
				pointerEvents="none"
				className="absolute left-0 right-0 top-0 overflow-hidden"
				style={{ paddingTop: insets.top }}
				intensity={80}

				blurTarget={blurTarget}
				blurMethod="dimezisBlurViewSdk31Plus"
			>
				<View className="px-4 pb-4 pt-2">
					<NativeWeatherLogo />
				</View>
			</StyledBlurView>
		</View>
	);
};
