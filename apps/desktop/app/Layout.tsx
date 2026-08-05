import { useNavigationScreen } from 'app/hooks/useNavigation.macos';
import { Toast } from 'app/utils/services/showToast.macos';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { Settings } from './Settings';
import { Sidebar } from './Sidebar';
import { Testing } from './Testing';
import { Weather } from './Weather';
import { Modals } from './Modals';

export default function Layout() {
	const { navigationScreen } = useNavigationScreen();

	return (
		<>
			<View className="flex-1 flex-row bg-secondarySystemBackground dark:bg-systemBackground_dark">
				<Sidebar />
				<View className={clsx('flex-1 items-center')}>
					{navigationScreen === 'weather' && <Weather />}
					{navigationScreen === 'settings' && <Settings />}
					{navigationScreen === 'testing' && <Testing />}
				</View>
				<Modals />
				<Toast />
			</View>
		</>
	);
}
