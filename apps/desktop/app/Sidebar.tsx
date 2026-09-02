import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { NativeWeatherLogo } from 'app/components/icons/logos/NativeWeatherLogo';
import { LocalWeather } from 'app/components/weather/LocalWeather';
import { border } from 'app/constants/border';
import { useStorageBoolean, useStorageString } from 'app/database/useStorage';
import { useLocation } from 'app/hooks/location/useLocation.macos';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { SearchIcon, Settings } from 'lucide-react-native';
import { ReactNode, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';

export const SidebarButton = ({ onPress, icon }: { onPress: () => void; icon: ReactNode }) => {
	return (
		<StyledPressable
			onPress={onPress}
			className={clsx('h-10 w-10 items-center justify-center self-end rounded-full p-1', border)}
		>
			{icon}
		</StyledPressable>
	);
};

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
				<SidebarButton
					icon={<Settings color={text} />}
					onPress={() => setNavigationScreen(navigationScreen === 'settings' ? 'weather' : 'settings')}
				/>
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
			{/* <View className="flex-row justify-end gap-2 p-4">
				<SidebarButton
					icon={<ShieldCheck color={text} />}
					onPress={() => setNavigationScreen(navigationScreen === 'testing' ? 'weather' : 'testing')}
				/>
				<SidebarButton
					icon={<Settings color={text} />}
					onPress={() => setNavigationScreen(navigationScreen === 'settings' ? 'weather' : 'settings')}
				/>
			</View> */}
			<View className="relative z-20 flex-row items-center justify-between gap-4 p-4">
				<StyledPressable
					onPress={() => setNavigationScreen('search')}
					className="h-12 flex-1 flex-row items-center gap-3 rounded-3xl !bg-primaryblue px-4"
				>
					<SearchIcon size={19} color="white" />
					<StyledText type="body" className="line-clamp-1 flex-1 font-semibold text-white">
						Search any city or coordinates..
					</StyledText>
				</StyledPressable>
			</View>
		</View>
	);
};
