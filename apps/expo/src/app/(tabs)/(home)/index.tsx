import {
	FavoriteCities,
	HeroSkeleton,
	LocalWeather,
	NativeWeatherLogo,
	ScreenWrapper,
	showToast,
	StatusView,
	useStartupCitySettled,
} from '@/ui';
import { isTauri } from '@tauri-apps/api/core';
import { useTranslate } from '@tolgee/react';
import { useState } from 'react';
import { Platform, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHomeLists } from '@/hooks/useHomeLists';
import { openCity } from '@/navigation';

export default function Home() {
	return isTauri() ? <DesktopHome /> : <HomeScreen />;
}

// The Tauri sidebar lists the cities and opens the first one on launch: a skeleton stands in until it does, and a
// hint to pick a city once it has nothing to open or the user comes back here.
function DesktopHome() {
	const { t } = useTranslate('common');
	const settled = useStartupCitySettled((state) => state.settled);

	return (
		<View className="flex-1 bg-screen-background">
			<ScreenWrapper centered={settled}>
				{settled ? (
					<StatusView icon="notfound" title={t('status.empty.title')} message={t('status.empty.message')} />
				) : (
					<HeroSkeleton />
				)}
			</ScreenWrapper>
		</View>
	);
}

function HomeScreen() {
	const { t } = useTranslate('common');
	const { top } = useSafeAreaInsets();
	const { showLocalWeather, favorites, error, onRemove } = useHomeLists();
	const [refreshing, setRefreshing] = useState(false);

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

	return (
		<View className="flex-1 bg-screen-background">
			<ScreenWrapper refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				{/* iOS adds the status bar inset itself; there is no header on this screen. */}
				<View className="gap-4" style={Platform.OS === 'ios' ? undefined : { paddingTop: top }}>
					{/* The web header already carries the logo. */}
					{Platform.OS !== 'web' && (
						<View className="pt-2">
							<NativeWeatherLogo colorClassName="accent-label" />
						</View>
					)}
					{showLocalWeather && <LocalWeather error={error} onOpen={openCity} />}
					<FavoriteCities favorites={favorites} onOpen={openCity} onRemove={onRemove} />
				</View>
			</ScreenWrapper>
		</View>
	);
}
