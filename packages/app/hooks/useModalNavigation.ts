import { Platform } from 'react-native';

interface ModalNavigationProps {
	mobile: () => void;
	macos: () => void;
	web: () => void;
}

export const useModalNavigation = ({ mobile, macos, web }: ModalNavigationProps) => {
	if (Platform.OS === 'ios' || Platform.OS === 'android') return mobile;
	if (Platform.OS === 'macos') return macos;

	return web;
};
