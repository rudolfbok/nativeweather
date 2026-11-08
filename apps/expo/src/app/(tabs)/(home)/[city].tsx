import { getLandscapeKey, useCityWeather, useWeather } from '@/core';
import { getCityRoute, getCityTitle, isReservedSlug } from '@nativeweather/api';
import type { NormalizedData } from '@nativeweather/types';
import {
	Button,
	CityHeaderButtons,
	FavoriteStar,
	getLandscapeColor,
	HeroSkeleton,
	ScreenWrapper,
	ShareButton,
	shareWeather,
	showToast,
	StatusView,
	SuggestedCities,
	WeatherHero,
} from '@/ui';
import { useTranslate } from '@tolgee/react';
import { router, Stack, Unmatched, useFocusEffect, useIsFocused, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { useCallback, useState } from 'react';
import { Platform, RefreshControl, View } from 'react-native';
import { openCity } from '@/navigation';

// iOS has glass buttons in the header (CityHeaderButtons); Android shows the share and favourite buttons there and
// web puts the star in the main card.
const AndroidHeaderActions = ({ weather }: { weather: NormalizedData }) => {
	const { t } = useTranslate('common');

	return (
		<View className="flex-row items-center gap-4">
			<ShareButton label={t('favorites.share')} color="white" onPress={() => void shareWeather(weather.location)} />
			<FavoriteStar weather={weather} color="white" />
		</View>
	);
};

type CityParams = { city: string; r?: string; cr?: string };

const isShownAt = (weather: NormalizedData | null, { city, r, cr }: CityParams) => {
	if (!weather) return false;
	const route = getCityRoute(weather.location);
	return route.city === city && route.r === r && route.cr === cr;
};

const CityWeather = (params: CityParams) => {
	const { t } = useTranslate('common');
	const requested = [params.city, params.r, params.cr].filter(Boolean).join(', ');
	const [query, setQuery] = useState(requested);
	const { weather, error, refresh, retry } = useCityWeather(query);
	const setWeatherData = useWeather((state) => state.setWeatherData);
	const storeWeather = useWeather((state) => state.weatherData);
	const shownAtUrl = isShownAt(weather, params);
	const focused = useIsFocused();

	// A new URL loads a new city, except when it is only the shown city's own slug written back below.
	if (requested !== query && !shownAtUrl) setQuery(requested);

	// The cards and modals read the open city from the shared store.
	useFocusEffect(
		useCallback(() => {
			if (weather) void setWeatherData(weather);
		}, [weather, setWeatherData])
	);

	// `/prague` becomes `/prague?r=hlavni-mesto-praha&cr=cz`, the URL that sharing and the Worker's canonical use.
	useFocusEffect(
		useCallback(() => {
			if (weather && !shownAtUrl) router.setParams(getCityRoute(weather.location));
		}, [weather, shownAtUrl])
	);
	const [refreshing, setRefreshing] = useState(false);
	const sky = weather && getLandscapeColor(getLandscapeKey(weather.current.condition.code), weather.current.isDay);

	const onRefresh = async () => {
		setRefreshing(true);
		const refreshed = await refresh();
		setRefreshing(false);
		showToast({ message: t(refreshed ? 'toast.refreshed' : 'toast.notrefreshed'), type: refreshed ? 'done' : 'error' });
	};

	return (
		<View className="flex-1 bg-screen-background">
			{/* The web page shows the city inside the main card instead of a header. */}
			<Stack.Screen
				options={{
					title: weather?.location.name ?? '',
					...(sky && {
						// The header takes the sky colour of the landscape it sits above.
						headerTransparent: Platform.OS === 'ios',
						headerShadowVisible: false,
						headerTitleStyle: { color: 'white' },
						headerStyle: { backgroundColor: sky },
						headerRight: Platform.OS === 'android' ? () => <AndroidHeaderActions weather={weather} /> : undefined,
					}),
				}}
			/>
			{/* The browser tab title. */}
			{Platform.OS === 'web' && focused && weather && (
				<Head>
					<title>{getCityTitle(weather.location)}</title>
				</Head>
			)}
			{weather && Platform.OS === 'ios' && <CityHeaderButtons weather={weather} />}
			<ScreenWrapper
				overscrollColor={sky ?? undefined}
				refreshControl={
					weather ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" /> : undefined
				}
			>
				{error === 'notfound' ? (
					<StatusView icon="notfound" title={t('status.notfound.title')} message={t('status.notfound.message')}>
						<SuggestedCities onOpen={openCity} />
					</StatusView>
				) : error ? (
					<StatusView icon="error" title={t(`status.${error}.title`)} message={t(`status.${error}.message`)}>
						<Button onPress={retry}>{t('status.retry')}</Button>
					</StatusView>
				) : weather && storeWeather === weather ? (
					<WeatherHero weather={weather} />
				) : (
					<HeroSkeleton />
				)}
			</ScreenWrapper>
		</View>
	);
};

export default function CityScreen() {
	const { city, r, cr } = useLocalSearchParams<CityParams>();

	if (isReservedSlug(city)) return <Unmatched />;

	return <CityWeather city={city} r={r} cr={cr} />;
}
