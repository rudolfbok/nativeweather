import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { border } from '@nativeweather/core/constants/border';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { Locate, Minus, Plus } from 'lucide-react-native';
import { Platform, View } from 'react-native';

const MapNavigationButton = ({
	icon,
	onPress,
	onPressIn,
}: {
	icon: React.ReactNode;
	onPress: () => void;
	onPressIn: () => void;
}) => (
	<StyledPressable
		onPress={onPress}
		onPressIn={onPressIn}
		className={clsx('ios:p-3 items-center rounded-full p-2', border)}
	>
		{icon}
	</StyledPressable>
);

export const MapNavigationControls = ({
	onLocate,
	onZoomIn,
	onZoomOut,
	onInteraction = () => {},
}: {
	onLocate: () => void;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onInteraction?: () => void;
}) => {
	const { text } = useThemeColors();
	const iconProps = { color: Platform.OS === 'ios' ? 'black' : text, size: 24, strokeWidth: 2.5 };

	return (
		<View className="ios:top-6 ios:left-6 absolute left-4 top-4 gap-2">
			<MapNavigationButton icon={<Plus {...iconProps} />} onPressIn={onInteraction} onPress={onZoomIn} />
			<MapNavigationButton icon={<Minus {...iconProps} />} onPressIn={onInteraction} onPress={onZoomOut} />
			<MapNavigationButton
				icon={<Locate {...iconProps} color="#007AFF" />}
				onPressIn={onInteraction}
				onPress={onLocate}
			/>
		</View>
	);
};
