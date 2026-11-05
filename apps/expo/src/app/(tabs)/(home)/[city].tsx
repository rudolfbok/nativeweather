// Phase 10A adds the server loader here.
import { getLandscapeKey, useCityWeather } from '@nativeweather/core';
import { getLandscapeColor, ScreenWrapper, showToast, Text } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Stack, Unmatched, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, RefreshControl, View } from 'react-native';
import { HeroSkeleton, WeatherHero } from '@/components/WeatherHero';

// Future static routes that `[city]` would otherwise swallow.
const reservedSlugs = ['compass', 'modals', 'api'];

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
						headerTintColor: 'white',
						headerTitleStyle: { color: 'white' },
						headerStyle: { backgroundColor: sky },
					}),
				}}
			/>
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
