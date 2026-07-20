import { View } from 'react-native';
import { Sidebar } from './SideBar';
import { Weather } from './Weather';
import { Settings } from './Settings';
import { useNavigationScreen } from './hooks/useNavigation';

export default function Layout() {
	const { navigationScreen } = useNavigationScreen();

	return (
		<View className="bg-secondarySystemBackground dark:bg-systemBackground_dark flex-1 flex-row gap-4 p-4">
			<Sidebar />
			<View className="flex-grow items-center border border-amber-500">
				{navigationScreen === 'weather' && <Weather />}
				{navigationScreen === 'settings' && <Settings />}
			</View>
		</View>
	);
}
