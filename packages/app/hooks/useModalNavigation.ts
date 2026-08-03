import { Platform } from 'react-native';

interface ModalNavigationProps {
	ios: () => void;
	macos: () => void;
	web: () => void;
}

export const useModalNavigation = ({ ios, macos, web }: ModalNavigationProps) => {
	if (Platform.OS === 'ios') return ios;
	if (Platform.OS === 'macos') return macos;

	return web;
};
