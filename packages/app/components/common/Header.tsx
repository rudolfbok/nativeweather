import { clsx } from 'clsx';
import { View } from 'react-native';
import { NativeWeatherLogo } from '../icons/logos/NativeWeatherLogo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = () => {
	const insets = useSafeAreaInsets();

	return (
		<View
			className={clsx('bg-secondarySystemBackground dark:bg-systemBackground_dark px-4 pb-4')}
			style={{ paddingTop: insets.top + 8 }}
		>
			<NativeWeatherLogo />
		</View>
	);
};
