import { Cloud } from 'lucide-react-native';
import { useThemeColors } from '../../../hooks/theme/useThemeColors';

export const CloudsIcon = () => {
	const { text } = useThemeColors();

	return <Cloud color={text} fill="white" />;
};
