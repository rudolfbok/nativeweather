import { useThemeColors } from '../../../hooks/theme/useThemeColors';
import { X } from 'lucide-react-native';

interface CloseIconProps {
	color?: string;
	size?: number;
}

export const CloseIcon = ({ color, size = 24 }: CloseIconProps) => {
	const { text } = useThemeColors();

	return <X color={color ? color : text} size={size} />;
};
