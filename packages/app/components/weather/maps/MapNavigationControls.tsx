import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { Locate, Minus, Plus } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';

const MapNavigationButton = ({ icon, onPress }: { icon: React.ReactNode; onPress: () => void }) => (
	<StyledPressable
		onPress={onPress}
		liquidGlass={true}
		glassEffectStyle="clear"
		// colorScheme="auto"
		className="ios:p-3 items-center rounded-full p-2.5"
	>
		{icon}
	</StyledPressable>
);

export const MapNavigationControls = ({
	onLocate,
	onZoomIn,
	onZoomOut,
}: {
	onLocate: () => void;
	onZoomIn: () => void;
	onZoomOut: () => void;
}) => {
	const { text } = useThemeColors();
	const iconProps = { color: Platform.OS === 'ios' ? 'black' : text, size: 22, strokeWidth: 2.5 };

	return (
		<View className="web:top-4 ios:left-6 absolute left-4 gap-2">
			<MapNavigationButton icon={<Plus {...iconProps} />} onPress={onZoomIn} />
			<MapNavigationButton icon={<Minus {...iconProps} />} onPress={onZoomOut} />
			<MapNavigationButton icon={<Locate {...iconProps} color="#007AFF" />} onPress={onLocate} />
		</View>
	);
};
