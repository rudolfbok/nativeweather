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
			ios: undefined,
			web: preset === 'error' ? <X size={22} color="red" /> : <Check color="blue" size={22} />
		}
	});

	return null;
};
