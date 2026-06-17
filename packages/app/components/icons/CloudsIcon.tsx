import { Cloud } from 'lucide-react-native';
import { useSwitchColors } from 'app/hooks/useSwitchColors';

export const CloudsIcon = () => {
	const switchColors = useSwitchColors('black', 'white');

	return <Cloud color={switchColors} />;
};
