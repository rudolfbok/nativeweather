import { useSwitchColors } from './switch/useSwitchColors';

export const useThemeColors = () => {
	return {
		headerBackground: useSwitchColors('#FFFFFF', '#121212'),
		backgroundColor: useSwitchColors('#F2F2F2', '#000000'),
		modalBackground: useSwitchColors('F2F2F2', '#0E0E0F'),
		textColor: useSwitchColors('#000000', '#FFFFFF'),
		borderColor: useSwitchColors('#FFFFFF', '#000000'),
	};
};
