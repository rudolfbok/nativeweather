import { useColorScheme } from 'nativewind';

export const useSwitchColors = (light: string, dark: string) => {
	const { colorScheme: currentTheme } = useColorScheme();

	if (currentTheme === 'dark' || currentTheme === undefined) {
		return dark;
	}

	return light;
};
