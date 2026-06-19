import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { X } from 'lucide-react-native';

interface CloseIconProps {
	color?: string;
	size?: number;
}

export const CloseIcon = ({ color, size = 24 }: CloseIconProps) => {
	const xColor = useSwitchColors('black', 'white');

	return <X color={color ? color : xColor} size={size} />;
};
