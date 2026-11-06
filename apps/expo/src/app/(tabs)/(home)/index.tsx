import { useFavoriteCityWeather, useLocation, useStorageBoolean } from '@nativeweather/core';
import type { City } from '@nativeweather/types';
import { FavoriteCities, LocalWeather, NativeWeatherLogo, ScreenWrapper, showToast } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { useEffect, useState } from 'react';
import { Platform, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { openCity } from '@/navigation';

export default function HomeScreen() {
	const { t } = useTranslate('common');
	const { top } = useSafeAreaInsets();
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const favorites = useFavoriteCityWeather({ refresh: true });
	const { getLocalWeather, error } = useLocation();
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		if (showLocalWeather) void getLocalWeather();
	}, [showLocalWeather, getLocalWeather]);

	const onRefresh = async () => {
		setRefreshing(true);
		const result = await favorites.refreshFavoriteCities({ showLoading: false });
		setRefreshing(false);
		// No result means a newer refresh replaced this one.
		if (result) {
			showToast({
				message: t(result.hasError ? 'toast.notrefreshed' : 'toast.refreshed'),
				type: result.hasError ? 'error' : 'done',
			});
		}
	};

	const onRemove = (city: City) => {
		favorites.handleRemoveCity(city);
		showToast({ message: t('toast.remove', { name: city.name }), type: 'remove' });
	};

	return (
		<View className="flex-1 bg-screen-background">
			<ScreenWrapper refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				{/* iOS adds the status bar inset itself; there is no header on this screen. */}
				<View className="gap-4" style={Platform.OS === 'ios' ? undefined : { paddingTop: top }}>
					<View className="pt-2">
						<NativeWeatherLogo colorClassName="accent-label" />
					</View>
					{showLocalWeather && <LocalWeather error={error} onOpen={openCity} />}
					<FavoriteCities favorites={favorites} onOpen={openCity} onRemove={onRemove} />
				</View>
			</ScreenWrapper>
		</View>
	);
}
