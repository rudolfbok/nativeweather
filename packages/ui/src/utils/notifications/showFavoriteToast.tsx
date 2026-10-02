import { NotificationToast } from '@nativeweather/ui/components/common/notifications/NotificationToast';
import { customToast } from './sonner';

interface ShowFavoriteToastProps {
	message: string;
	type: 'add' | 'remove';
}

export const showFavoriteToast = ({ message, type }: ShowFavoriteToastProps) => {
	customToast(<NotificationToast message={message} type={type} />);
};
