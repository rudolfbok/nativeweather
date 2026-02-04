import * as Burnt from 'burnt';
import { Star, StarOff } from 'lucide-react-native';

interface ShowFavoriteToastProps {
	message: string;
	type: 'add' | 'remove';
}

export const showFavoriteToast = ({ message, type }: ShowFavoriteToastProps) => {
	const starIcon =
		type === 'add' ? <Star size={22} color="#FE9804" fill="#FE9804" /> : <StarOff size={22} color="#FE9804" />;
	const iosStarIconName = type === 'add' ? 'star.fill' : 'star.slash';

	Burnt.toast({
		preset: 'custom',
		title: message,
		from: 'bottom',
		icon: { ios: { name: iosStarIconName, color: '#FE9804' }, web: starIcon },
	});

	return null;
};
