import { useStorageBoolean, useStorageString } from '@nativeweather/core/database/useStorage';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { NativeWeatherLogo } from '@nativeweather/ui/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from '@nativeweather/ui/components/weather/home/FavoriteCities';
import { LocalWeather } from '@nativeweather/ui/components/weather/home/LocalWeather';
import { useLocation } from '@nativeweather/ui/hooks/location/useLocation.macos';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { useFavoriteCities } from '@nativeweather/ui/hooks/weather/useFavoriteCities';
import { clsx } from 'clsx';
import { SearchIcon, Settings } from 'lucide-react-native';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

export const Sidebar = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const [currentSource] = useStorageString('currentSource');
	const favoriteHook = useFavoriteCities({ refresh: true });
	const { navigationScreen, setNavigationScreen } = useNavigationScreen();
	const { text } = useThemeColors();
	const { getLocalWeather, error: localWeatherError, locationReady } = useLocation();

	useEffect(() => {
		if (showLocalWeather && currentSource) {
			getLocalWeather();
		}
	}, [showLocalWeather, currentSource, getLocalWeather]);

	return (
		<View className={clsx('w-[340px] bg-systemBackground dark:bg-secondarySystemBackground_dark')}>
			<View className="flex-row items-center justify-between px-4 pb-4 pt-10">
				<NativeWeatherLogo />
				<StyledPressable
					onPress={() => setNavigationScreen(navigationScreen === 'settings' ? 'weather' : 'settings')}
					className={clsx('h-10 w-10 items-center justify-center self-end rounded-full p-1')}
				>
					<Settings color={text} />
				</StyledPressable>
			</View>
			<ScrollView className="flex-1" contentContainerClassName="px-4 pb-4 gap-2">
				{showLocalWeather && locationReady && <LocalWeather error={localWeatherError} />}
				<FavoriteCities hook={favoriteHook} />
			</ScrollView>
			<View className="absolute bottom-6 right-6 z-20">
				<StyledPressable
					onPress={() => setNavigationScreen('search')}
					className={clsx('items-center rounded-full !bg-primaryblue p-3')}
				>
					<SearchIcon size={22} color="white" strokeWidth={3} />
				</StyledPressable>
			</View>
		</View>
	);
};
