import { NotificationToast } from '../../components/common/notifications/NotificationToast';
import { customToast } from './sonner';

interface ShowToastProps {
	message: string;
	preset: 'error' | 'done';
}

export const showToast = ({ message, preset }: ShowToastProps) => {
	customToast(<NotificationToast message={message} type={preset} />);

	return null;
};
