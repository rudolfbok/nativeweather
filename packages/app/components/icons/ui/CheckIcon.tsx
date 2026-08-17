import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { Check } from 'lucide-react-native';

export const CheckIcon = () => {
	const { text } = useThemeColors();

	return <Check color={text} />;
};
