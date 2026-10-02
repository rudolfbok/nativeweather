import { Platform } from 'react-native';

interface ModalNavigationProps {
	mobile: () => void;
	macos: () => void;
	web: () => void;
}

export const useModalNavigation = ({ mobile, macos, web }: ModalNavigationProps) => {
	if (Platform.OS === 'web') return web;
	if (Platform.OS === 'macos') return macos;

	return mobile;
};
