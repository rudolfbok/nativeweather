import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { SettingsFeature } from 'app/features/settings/screen';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { Settings, ShieldCheck } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

export const Sidebar = () => {
	const favoriteHook = useFavoriteCities();
	const { navigationScreen, setNavigationScreen } = useNavigationScreen();
	const { text } = useThemeColors();

	return (
		<View className="my-4 ml-4 w-[340px] justify-between rounded-3xl bg-systemBackground xl:w-[360px] 2xl:w-[380px] dark:bg-secondarySystemBackground_dark">
			<ScrollView contentContainerClassName="flex h-full p-4">
				<View className="w-full">
					<FavoriteCities hook={favoriteHook} />
				</View>

				{/* <View>
					<SettingsFeature />
				</View> */}
			</ScrollView>
			<View className="flex-row justify-end gap-2 p-4">
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
