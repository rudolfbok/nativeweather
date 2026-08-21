import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { Modals } from './Modals';
import { Settings } from './Settings';
import { Testing } from './Testing';
import { Weather } from './Weather';
import { View } from 'react-native';

export const Screens = () => {
	const { navigationScreen, modalScreen } = useNavigationScreen();

	return (
		<View className="w-full flex-1">
			<View className="flex-1" style={{ display: modalScreen ? 'none' : 'flex' }}>
				{navigationScreen === 'settings' ? <Settings /> : navigationScreen === 'testing' ? <Testing /> : <Weather />}
			</View>
			{modalScreen && (
				<View className="flex-1 bg-secondarySystemBackground dark:bg-systemBackground_dark">
					<Modals />
				</View>
			)}
		</View>
	);
};
