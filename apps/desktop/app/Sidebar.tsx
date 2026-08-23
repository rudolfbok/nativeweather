import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { FavoriteCities } from 'app/components/weather/FavoriteCities';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { Settings, ShieldCheck } from 'lucide-react-native';
import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

export const SidebarButton = ({ onPress, icon }: { onPress: () => void; icon: ReactNode }) => {
	return (
		<StyledPressable onPress={onPress} className="h-10 w-10 items-center justify-center self-end rounded-full p-1">
			{icon}
		</StyledPressable>
	);
};

export const Sidebar = () => {
	const favoriteHook = useFavoriteCities({ refresh: true });
	const { navigationScreen, setNavigationScreen } = useNavigationScreen();
	const { text } = useThemeColors();

	return (
		<View className="my-4 ml-4 w-[340px] justify-between rounded-3xl bg-systemBackground dark:bg-secondarySystemBackground_dark">
			{/* <View className="relative z-20 mx-4 mt-4">
				<SearchBar />
			</View> */}
			<ScrollView className="z-0 flex-1" contentContainerClassName="flex h-full p-4">
				<View className="w-full">
					<FavoriteCities hook={favoriteHook} />
				</View>
			</ScrollView>
			<View className="flex-row justify-end gap-2 p-4">
				<SidebarButton
					icon={<ShieldCheck color={text} />}
					onPress={() => setNavigationScreen(navigationScreen === 'testing' ? 'weather' : 'testing')}
				/>
				<SidebarButton
					icon={<Settings color={text} />}
					onPress={() => setNavigationScreen(navigationScreen === 'settings' ? 'weather' : 'settings')}
				/>
			</View>
		</View>
	);
};
