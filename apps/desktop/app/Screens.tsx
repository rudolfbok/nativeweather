import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigationScreen';
import { Modals } from './Modals';
import { Search } from './Search';
import { Settings } from './Settings';
import { Testing } from './Testing';
import { Weather } from './Weather';
import { View } from 'react-native';

export const Screens = () => {
	const { navigationScreen, modalScreen } = useNavigationScreen();

	return (
		<View className="w-full flex-1">
			<View className={modalScreen ? 'hidden' : 'flex-1'}>
				{navigationScreen === 'search' ? (
					<Search />
				) : navigationScreen === 'settings' ? (
					<Settings />
				) : navigationScreen === 'testing' ? (
					<Testing />
				) : (
					<Weather />
				)}
			</View>
			{modalScreen && (
				<View className="flex-1 bg-secondarySystemBackground dark:bg-systemBackground_dark">
					<Modals />
				</View>
			)}
		</View>
	);
};
