import { useNavigationScreen } from 'app/hooks/useNavigation.macos';
import { Toast } from 'app/utils/services/showToast.macos';
import { View } from 'react-native';
import { Settings } from './Settings';
import { Sidebar } from './Sidebar';
import { Weather } from './Weather';

export default function Layout() {
	const { navigationScreen } = useNavigationScreen();

	return (
		<View className="flex-1 flex-row gap-4 bg-secondarySystemBackground p-4 dark:bg-systemBackground_dark">
			<Sidebar />
			<View className="flex-grow items-center">
				{navigationScreen === 'weather' && <Weather />}
				{navigationScreen === 'settings' && <Settings />}
			</View>
			<Toast />
		</View>
	);
}
