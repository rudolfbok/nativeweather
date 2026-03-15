import { useSwitchColors } from './switch/useSwitchColors';

export const useThemeColors = () => {
	return {
		headerBackground: useSwitchColors('#FFFFFF', '#121212'),
		bodyBackground: useSwitchColors('#F2F2F2', '#000000'),
		textColor: useSwitchColors('#000000', '#FFFFFF'),
		borderColor: useSwitchColors('#FFFFFF', '#000000'),
	};
};
