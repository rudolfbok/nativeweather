import { colors } from '../constants/colors';
import { useColorScheme } from 'nativewind';

export function useThemeColors() {
	const { colorScheme } = useColorScheme();
	return colors[colorScheme === 'dark' || colorScheme === undefined ? 'dark' : 'light'];
}
