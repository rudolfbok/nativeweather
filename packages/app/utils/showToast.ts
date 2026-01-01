import * as Burnt from 'burnt';

interface ShowToastProps {
	message: string;
	type: 'error' | 'done' | 'custom';
	iosIcon?: string;
	iosIconColor?: string;
}

export const showToast = ({ message, type, iosIcon, iosIconColor }: ShowToastProps) => {
	Burnt.toast({
		preset: type,
		title: message,
		from: 'bottom',
		icon: type === 'custom' ? { ios: { name: iosIcon, color: iosIconColor } } : undefined,
	});

	return null;
};
