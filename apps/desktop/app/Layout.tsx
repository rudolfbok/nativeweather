import { Toast } from '@nativeweather/ui/utils/notifications/showToast.macos';
import { View } from 'react-native';
import { Sidebar } from './Sidebar';
import { Screens } from './Screens';

export default function Layout() {
	return (
		<View className="flex-1 flex-row bg-secondarySystemBackground dark:bg-systemBackground_dark">
			<Sidebar />
			<Screens />
			<Toast />
		</View>
	);
}
