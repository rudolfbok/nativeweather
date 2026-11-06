// Phase 10A adds the server loader here.
import { getLandscapeKey, useCityWeather } from '@nativeweather/core';
import type { NormalizedData } from '@nativeweather/types';
import { getLandscapeColor, ScreenWrapper, ShareButton, shareWeather, showToast, Text } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Stack, Unmatched, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, RefreshControl, View } from 'react-native';
import { CityHeaderButtons } from '@/components/CityHeaderButtons';
import { FavoriteButton } from '@/components/FavoriteButton';
import { HeroSkeleton, WeatherHero } from '@/components/WeatherHero';

// Future static routes that `[city]` would otherwise swallow.
const reservedSlugs = ['compass', 'modals', 'api'];

// iOS has glass buttons in the header (CityHeaderButtons); Android shows the share and favourite buttons there and
// web puts the star in the main card.
const AndroidHeaderActions = ({ weather }: { weather: NormalizedData }) => {
	const { t } = useTranslate('common');

	return (
		<View className="flex-row items-center gap-4">
			<ShareButton label={t('favorites.share')} color="white" onPress={() => void shareWeather(weather.location)} />
			<FavoriteButton weather={weather} color="white" />
		</View>
	);
};

const CityWeather = ({ query }: { query: string }) => {
	const { t } = useTranslate('common');
	const { weather, failed, refresh } = useCityWeather(query);
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
					headerShown: Platform.OS !== 'web',
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
			{weather && Platform.OS === 'ios' && <CityHeaderButtons weather={weather} />}
			<ScreenWrapper
				overscrollColor={sky ?? undefined}
				refreshControl={
					weather ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" /> : undefined
				}
			>
				{failed ? (
					<Text type="body" className="pt-12 text-center">
						{t('search.url.error')}
					</Text>
				) : weather ? (
					<WeatherHero weather={weather} />
				) : (
					<HeroSkeleton />
				)}
			</ScreenWrapper>
		</View>
	);
};

export default function CityScreen() {
	const { city, r, cr } = useLocalSearchParams<{ city: string; r?: string; cr?: string }>();

	if (reservedSlugs.includes(city)) return <Unmatched />;

	return <CityWeather query={[city, r, cr].filter(Boolean).join(', ')} />;
}
