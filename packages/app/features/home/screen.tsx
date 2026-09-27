'use client';

import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from 'app/components/weather/home/FavoriteCities';
import { LocalWeather } from 'app/components/weather/home/LocalWeather';
import { PullIndicator } from 'app/components/common/loading/PullIndicator';
import { fetchWeather } from 'app/api/fetchWeather';
import { useStorageBoolean, useStorageString } from 'app/database/useStorage';
import { useLocation } from 'app/hooks/location/useLocation';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useWidgets } from 'app/hooks/widgets/useWidgets';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Platform, RefreshControl, View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeFeature = () => {
	const { t } = useTranslate('weather');
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const refreshProgress = useSharedValue(0);
	const pullProgress = useSharedValue(0);
	const dragging = useSharedValue(false);
	const refreshLocked = useSharedValue(false);
	const refreshInFlight = useRef(false);
	const active = useRef(true);
	const headerHeight = insets.top;
	const blurTarget = useRef<View>(null);
	const favoriteCitiesHook = useFavoriteCities({ refresh: true });
	const { getLocalWeather, error: localWeatherError } = useLocation();
	const { text } = useThemeColors();

	useEffect(() => {
		refreshProgress.value = withTiming(refreshing ? 1 : 0, { duration: 180 });
	}, [refreshing, refreshProgress]);

	useEffect(() => {
		active.current = true;
		dragging.value = false;
		pullProgress.value = 0;
		return () => {
			active.current = false;
			dragging.value = false;
			pullProgress.value = 0;
		};
	}, [dragging, pullProgress]);

	const pullIndicatorStyle = useAnimatedStyle(() => ({
		opacity: Math.max(Math.min(pullProgress.value * 12, 1), refreshProgress.value),
	}));

	const onRefresh = async () => {
		if (refreshInFlight.current || !active.current) return;

		refreshInFlight.current = true;
		refreshLocked.value = true;
		try {
			await favoriteCitiesHook.refreshFavoriteCities({ displayToast: true, setRefreshing });
		} finally {
			refreshInFlight.current = false;
			refreshLocked.value = false;
			refreshProgress.value = withTiming(0, { duration: 180 });
		}
	};

	const handleScroll = useAnimatedScrollHandler({
		onBeginDrag: () => {
			dragging.value = !refreshLocked.value;
		},
		onScroll: (event) => {
			if (Platform.OS !== 'ios' || !dragging.value || refreshLocked.value) return;
			pullProgress.value = Math.min(Math.max(-(event.contentOffset.y + headerHeight) / 80, 0), 1);
		},
	});

	const handleEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const releasedPull = -(event.nativeEvent.contentOffset.y + headerHeight);
		const shouldRefresh = Platform.OS === 'ios' && dragging.value && !refreshLocked.value && releasedPull >= 80;
		dragging.value = false;
		if (shouldRefresh) {
			refreshLocked.value = true;
			pullProgress.value = 0;
			refreshProgress.value = 1;
			onRefresh();
		} else {
			pullProgress.value = withTiming(0, { duration: 180 });
		}
	};

	useWidgets();

	useEffect(() => {
		if (showLocalWeather && currentSource) {
			void getLocalWeather();
		}
	}, [showLocalWeather, currentSource, getLocalWeather]);

	useEffect(() => {
		if (Platform.OS !== 'ios' || weatherData || !currentSource) return;

		let cancelled = false;
		const loadInitialWeather = async () => {
			const initialWeather = await fetchWeather('New York', currentSource);

			if (!cancelled && initialWeather && !useWeather.getState().weatherData) {
				await setWeatherData(initialWeather);
			}
		};

		void loadInitialWeather();
		return () => {
			cancelled = true;
		};
	}, [currentSource, setWeatherData, weatherData]);

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
		<View ref={blurTarget} className="flex-1" style={{ paddingTop: headerHeight }}>
			<View className="px-4 pb-4 pt-2">
				<NativeWeatherLogo />
			</View>
			<Animated.View
				pointerEvents="none"
				className="absolute left-0 right-0 z-20 h-9 items-center justify-center"
				style={[{ top: headerHeight + 50 }, pullIndicatorStyle]}
			>
				{Platform.OS === 'ios' && <PullIndicator progress={pullProgress} refreshing={refreshProgress} />}
			</Animated.View>
			<Animated.ScrollView
				onScroll={handleScroll}
				onScrollEndDrag={handleEndDrag}
				scrollEventThrottle={16}
				alwaysBounceVertical={true}
				contentInsetAdjustmentBehavior="never"
				contentContainerClassName="px-4 pb-4"
				contentInset={Platform.OS === 'ios' ? { bottom: insets.bottom } : undefined}
				contentOffset={Platform.OS === 'ios' ? { x: 0, y: -headerHeight } : undefined}
				contentContainerStyle={Platform.OS === 'android' ? { paddingTop: headerHeight } : undefined}
				scrollIndicatorInsets={{ top: headerHeight, bottom: insets.bottom }}
				automaticallyAdjustsScrollIndicatorInsets={false}
				refreshControl={
					Platform.OS === 'ios' ? undefined : (
						<RefreshControl
							tintColor={text}
							progressViewOffset={headerHeight}
							refreshing={refreshing}
							onRefresh={onRefresh}
							style={{ zIndex: 100 }}
						/>
					)
				}
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
			</Animated.ScrollView>
		</View>
	);
};
