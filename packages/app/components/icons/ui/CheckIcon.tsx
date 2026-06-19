import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { Check } from 'lucide-react-native';

export const CheckIcon = () => {
	const checkColor = useSwitchColors('black', 'white');

	return <Check color={checkColor} />;
};
