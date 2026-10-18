import { fetchWeather } from '@nativeweather/api/fetchWeather';
import { textOutline } from '@nativeweather/ui/constants/textOutline';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { PullIndicator } from '@nativeweather/ui/components/common/loading/PullIndicator';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { HeroSkeleton } from '@nativeweather/ui/components/common/loading/HeroSkeleton';
import { HeroWeather } from '@nativeweather/ui/components/weather/hero/HeroWeather';
import { useLocation } from '@nativeweather/ui/hooks/location/useLocation';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { useTranslate } from '@tolgee/react';
import { showToast } from '@nativeweather/ui/utils/notifications/showToast';
import { clsx } from 'clsx';
import { useNavigation } from 'expo-router';
import { useIsFocused } from 'expo-router';
import { useHeaderHeight } from 'expo-router/react-navigation';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, RefreshControl, View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const WeatherFeature = () => {
	const { t } = useTranslate('common');
	const [currentSource] = useStorageString('currentSource');
	const { weatherData, setWeatherData } = useWeather();
	const { getLocalWeather } = useLocation();
	const { text } = useThemeColors();
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const refreshProgress = useSharedValue(0);
	const pullProgress = useSharedValue(0);
	const dragging = useSharedValue(false);
	const refreshLocked = useSharedValue(false);
	const refreshInFlight = useRef(false);
	const active = useRef(true);
	const headerHeight = useHeaderHeight();
	const focused = useIsFocused();
	const navigation = useNavigation();

	useEffect(() => {
		if (Platform.OS === 'ios' || weatherData || !currentSource) return;

		const loadInitialWeather = async () => {
			const localWeather = await getLocalWeather();
			const initialWeather = localWeather ?? (await fetchWeather('New York', currentSource));

			if (initialWeather && !useWeather.getState().weatherData) {
				await setWeatherData(initialWeather);
			}
		};

		loadInitialWeather();
	}, [currentSource, getLocalWeather, setWeatherData, weatherData]);

	useEffect(() => {
		refreshProgress.value = withTiming(refreshing && focused ? 1 : 0, { duration: 180 });
	}, [refreshing, focused, refreshProgress]);

	useEffect(() => {
		active.current = focused;
		dragging.value = false;
		pullProgress.value = 0;
		return () => {
			active.current = false;
			dragging.value = false;
			pullProgress.value = 0;
		};
	}, [focused, headerHeight, dragging, pullProgress]);

	const pullIndicatorStyle = useAnimatedStyle(() => ({
		opacity: Math.max(Math.min(pullProgress.value * 12, 1), refreshProgress.value),
	}));

	useEffect(() => {
		if (weatherData) {
			navigation.setOptions({
				headerTitle: () => (
					<StyledText type="title" style={{ color: 'white' }} className={clsx(textOutline)}>
						{weatherData.location.name}
					</StyledText>
				),
				headerTintColor: 'white',
				headerTitleStyle: { color: 'white' },
			});
		} else {
			navigation.setOptions({
				headerTitle: t('tab.weather'),
				headerTintColor: text,
				headerTitleStyle: { color: text },
			});
		}
	}, [navigation, t, text, weatherData]);

	const onRefresh = async () => {
		if (refreshInFlight.current) return;
		if (!weatherData || !active.current) {
			refreshLocked.value = false;
			refreshProgress.value = 0;
			return;
		}

		refreshInFlight.current = true;
		setRefreshing(true);

		try {
			const refreshedData = await fetchWeather(
				`${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`,
				currentSource
			);

			if (!refreshedData) throw new Error('No fresh weather data');

			setWeatherData(refreshedData);

			showToast({ message: t('toast.refreshed'), preset: 'done' });
		} catch {
			showToast({ message: t('toast.notrefreshed'), preset: 'error' });
		} finally {
			refreshInFlight.current = false;
			refreshLocked.value = false;
			refreshProgress.value = withTiming(0, { duration: 180 });
			setRefreshing(false);
		}
	};

	const handleScroll = useAnimatedScrollHandler({
		onBeginDrag: () => {
			dragging.value = focused && !refreshLocked.value;
		},
		onScroll: (event) => {
			if (Platform.OS !== 'ios' || !dragging.value || refreshLocked.value) return;

			// Automatic iOS header insets are absent from the scroll event's contentInset.
			pullProgress.value = Math.min(Math.max(-(event.contentOffset.y + headerHeight), 0) / 80, 1);
		},
	});

	const handleEndDrag = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
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

	if (!weatherData) {
		return <HeroSkeleton />;
	}

	return (
		<View className={clsx('flex-1')}>
			<Animated.View
				pointerEvents="none"
				className={clsx('absolute left-0 right-0 z-20 h-9 items-center justify-center')}
				style={[{ top: insets.top + 60 }, pullIndicatorStyle]}
			>
				{Platform.OS === 'ios' ? (
					<PullIndicator progress={pullProgress} refreshing={refreshProgress} alwaysWhite={true} />
				) : (
					<ActivityIndicator animating={true} size="large" color="#FFFFFF" />
				)}
			</Animated.View>
			<Animated.ScrollView
				onScroll={handleScroll}
				onScrollEndDrag={handleEndDrag}
				scrollEventThrottle={16}
				contentInsetAdjustmentBehavior="automatic"
				alwaysBounceVertical={true}
				refreshControl={
					Platform.OS === 'ios' ? undefined : <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<HeroWeather />
			</Animated.ScrollView>
		</View>
	);
};
