import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useNavigationScreen } from 'app/hooks/useNavigation.macos';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { Settings, ShieldCheck } from 'lucide-react-native';
import { View } from 'react-native';

export const Sidebar = () => {
	const favoriteHook = useFavoriteCities();
	const { navigationScreen, setNavigationScreen } = useNavigationScreen();
	const { text } = useThemeColors();

	return (
		<View className="m-4 w-[340px] justify-between rounded-3xl bg-systemBackground p-4 dark:bg-secondarySystemBackground_dark">
			<View className="w-full">
				<FavoriteCities hook={favoriteHook} />
			</View>

			<View className="flex-row justify-end gap-2">
				<StyledPressable
					onPress={() => setNavigationScreen(navigationScreen === 'testing' ? 'weather' : 'testing')}
					className="h-10 w-10 items-center justify-center self-end rounded-full p-1"
				>
					<ShieldCheck color={text} />
				</StyledPressable>
				<StyledPressable
					onPress={() => setNavigationScreen(navigationScreen === 'settings' ? 'weather' : 'settings')}
					className="h-10 w-10 items-center justify-center self-end rounded-full p-1"
				>
					<Settings color={text} />
				</StyledPressable>
			</View>
		</View>
	);
};
