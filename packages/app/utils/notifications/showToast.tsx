import * as Burnt from 'burnt';
import { Check, X } from 'lucide-react-native';
import { Platform } from 'react-native';

interface ShowToastProps {
	message: string;
	preset: 'error' | 'done';
}

export const showToast = ({ message, preset }: ShowToastProps) => {
	Burnt.toast({
		preset: Platform.OS === 'web' ? 'custom' : preset,
		title: message,
		from: 'bottom',
		icon: {
			web: preset === 'error' ? <X size={22} color="#FF0000" /> : <Check color="#007AFF" size={22} />,
			ios: undefined,
		},
	});

	return null;
};
