import { colors } from '@nativeweather/ui/constants/colors';
import { useColorScheme } from 'nativewind';

export function useThemeColors() {
	const { colorScheme } = useColorScheme();
	return colors[colorScheme === 'dark' || colorScheme === undefined ? 'dark' : 'light'];
}
