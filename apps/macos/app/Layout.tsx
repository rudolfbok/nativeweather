import { View } from 'react-native';
import { Sidebar } from './Sidebar';
import { Weather } from './Weather';
import { Settings } from './Settings';
import { useNavigationScreen } from './hooks/useNavigation';

export default function Layout() {
	const { navigationScreen } = useNavigationScreen();

	return (
		<View className="flex-1 flex-row gap-4 bg-secondarySystemBackground p-4 dark:bg-systemBackground_dark">
			<Sidebar />
			<View className="flex-grow items-center border border-amber-500">
				{navigationScreen === 'weather' && <Weather />}
				{navigationScreen === 'settings' && <Settings />}
			</View>
		</View>
	);
}
