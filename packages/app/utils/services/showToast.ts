import * as Burnt from 'burnt';

interface ShowToastProps {
	message: string;
	preset: 'error' | 'done';
}

export const showToast = ({ message, preset }: ShowToastProps) => {
	Burnt.toast({
		preset: preset,
		title: message,
		from: 'bottom',
	});

	return null;
};
