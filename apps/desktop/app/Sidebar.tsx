import { useTranslate } from '@tolgee/react';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { border } from 'app/constants/border';
import { useStorageBoolean, useStorageString } from 'app/database/useStorage';
import { useLocation } from 'app/hooks/location/useLocation.macos';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { clsx } from 'clsx';
import { SearchIcon, Settings } from 'lucide-react-native';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

export const Sidebar = () => {
	const { t } = useTranslate('weather');
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
		<View
			className={clsx(
				'my-4 ml-4 w-[340px] rounded-3xl bg-systemBackground dark:bg-secondarySystemBackground_dark',
				border
			)}
		>
			<View className="flex-row items-center justify-between p-4">
				<NativeWeatherLogo />
				<StyledPressable
					onPress={() => setNavigationScreen(navigationScreen === 'settings' ? 'weather' : 'settings')}
					className={clsx('h-10 w-10 items-center justify-center self-end rounded-full p-1', border)}
				>
					<Settings color={text} />
				</StyledPressable>
			</View>
			<ScrollView className="flex-1" contentContainerClassName="px-4 gap-4">
				{showLocalWeather && locationReady && (
					<View className="mb-22 w-full gap-2">
						<StyledText type="maintitle">{t('localweather.title')}</StyledText>
						<LocalWeather error={localWeatherError} />
					</View>
				)}
				<FavoriteCities hook={favoriteHook} />
			</ScrollView>
			<View className="absolute bottom-6 right-6 z-20">
				<StyledPressable
					onPress={() => setNavigationScreen('search')}
					className={clsx('items-center rounded-full !bg-primaryblue p-3', border)}
				>
					<SearchIcon size={22} color="white" strokeWidth={3} />
				</StyledPressable>
			</View>
		</View>
	);
};
