import { useNavigationScreen } from 'app/hooks/useNavigation.macos';
import { Toast } from 'app/utils/services/showToast.macos';
import { View } from 'react-native';
import { Settings } from './Settings';
import { Sidebar } from './Sidebar';
import { Weather } from './Weather';
import { Testing } from './Testing';
import { clsx } from 'clsx';

export default function Layout() {
	const { navigationScreen } = useNavigationScreen();

	return (
		<View className="flex-1 flex-row bg-secondarySystemBackground dark:bg-systemBackground_dark">
			<Sidebar />
			<View className={clsx('flex-1 items-center')}>
				{navigationScreen === 'weather' && <Weather />}
				{navigationScreen === 'settings' && <Settings />}
				{navigationScreen === 'testing' && <Testing />}
			</View>
			<Toast />
		</View>
	);
}
